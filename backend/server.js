const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const { User, Card, Cart, CartItem } = require('./models'); // Asegúrate de incluir Cart y CartItem
const authMiddleware = require('./middleware/authMiddleware');
const upload = require('./middleware/upload');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde /uploads
app.use('/uploads', express.static(path.join(__dirname, './public', 'uploads')));

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Backend funcionando!');
});

// Ruta de registro
app.post('/api/register', async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  const userExists = await User.findOne({ where: { email } });
  if (userExists) {
    return res.status(400).json({ message: 'El usuario ya existe' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await User.create({ email, password: hashedPassword, firstName, lastName });

    // Crear el token JWT para el nuevo usuario
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      token: token // Enviar el token al frontend
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar al usuario' });
  }
});

// Ruta de login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(400).json({ message: 'Credenciales incorrectas' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Credenciales incorrectas' });
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token });
});

// Ruta para obtener todas las cartas
app.get('/api/cards', async (req, res) => {
  try {
    const cards = await Card.findAll({
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'firstName', 'lastName', 'email']
      }]
    });
    res.json(cards);
  } catch (error) {
    console.error('Error al obtener las cartas:', error);
    res.status(500).json({ message: 'Error al obtener las cartas' });
  }
});

// Ruta para publicar una carta con imagen
app.post('/api/cards', authMiddleware, upload.single('image'), async (req, res) => {
  console.log('===> POST /api/cards ejecutado');
  console.log('Usuario:', req.userId);
  console.log('Body:', req.body);
  console.log('Archivo:', req.file);
  const { name, stars, type, element, description, code } = req.body;
  const userId = req.userId;

  try {
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newCard = await Card.create({
      name,
      stars,
      type,
      image: imageUrl,
      element,
      description,
      code,
      userId,
    });

    res.status(201).json(newCard);
  } catch (error) {
    console.error('Error al crear la carta:', error);
    res.status(500).json({ message: 'Error al crear la carta' });
  }
});

// Ruta para obtener los productos del carrito
app.get('/api/cart', authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({
      where: { userId: req.userId },
      include: [{
        model: Card,
        as: 'products',
        attributes: ['id', 'name', 'price', 'image'],
        through: { attributes: ['quantity'] } // Incluye cantidad desde CartItem
      }]
    });

    if (!cart) {
      return res.status(404).json({ message: 'Carrito vacío o no encontrado' });
    }

    res.json(cart); // ✅ devolvemos el carrito completo, no solo los productos
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    res.status(500).json({ message: 'Error al obtener el carrito' });
  }
});


// Ruta para agregar un producto al carrito
app.post('/api/cart', authMiddleware, async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ where: { userId: req.userId } });

    if (!cart) {
      cart = await Cart.create({ userId: req.userId });
    }

    const existingProduct = await CartItem.findOne({
      where: { cartId: cart.id, productId }
    });

    if (existingProduct) {
      // Si el producto ya está en el carrito, actualizamos la cantidad
      existingProduct.quantity += quantity;
      await existingProduct.save();
    } else {
      // Si el producto no está en el carrito, lo agregamos
      await CartItem.create({ cartId: cart.id, productId, quantity });
    }

    res.status(201).json({ message: 'Producto agregado al carrito' });
  } catch (error) {
    console.error('Error al agregar producto al carrito:', error);
    res.status(500).json({ message: 'Error al agregar producto al carrito' });
  }
});

// Ruta para eliminar un producto del carrito
app.delete('/api/cart/:productId', authMiddleware, async (req, res) => {
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ where: { userId: req.userId } });

    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    const cartItem = await CartItem.findOne({ where: { cartId: cart.id, productId } });

    if (!cartItem) {
      return res.status(404).json({ message: 'Producto no encontrado en el carrito' });
    }

    await cartItem.destroy();

    res.status(200).json({ message: 'Producto eliminado del carrito' });
  } catch (error) {
    console.error('Error al eliminar producto del carrito:', error);
    res.status(500).json({ message: 'Error al eliminar producto del carrito' });
  }
});

// Ruta para actualizar la cantidad de un producto en el carrito
app.put('/api/cart/:productId', authMiddleware, async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await Cart.findOne({ where: { userId: req.userId } });

    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    const cartItem = await CartItem.findOne({ where: { cartId: cart.id, productId } });

    if (!cartItem) {
      return res.status(404).json({ message: 'Producto no encontrado en el carrito' });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    res.status(200).json({ message: 'Cantidad actualizada en el carrito' });
  } catch (error) {
    console.error('Error al actualizar la cantidad:', error);
    res.status(500).json({ message: 'Error al actualizar la cantidad' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});