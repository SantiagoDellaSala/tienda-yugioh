// server.js
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Card } = require('./models'); 
require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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
    const newUser = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName
    });

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
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

// Ruta API para obtener todas las cartas
app.get('/api/cards', async (req, res) => {
  try {
    const cards = await Card.findAll({
      include: [{
        model: User,
        as: 'user', // Incluimos el usuario para cada carta
        attributes: ['id', 'firstName', 'lastName', 'email']
      }]
    });
    res.json(cards);
  } catch (error) {
    console.error('Error al obtener las cartas:', error);
    res.status(500).json({ message: 'Error al obtener las cartas' });
  }
});

// Ruta para publicar una carta (requiere autenticación)
const authMiddleware = require('./middleware/authMiddleware');
app.post('/api/cards', authMiddleware, async (req, res) => {
  const { name, stars, type, image, element, description, code } = req.body;
  const userId = req.userId;

  try {
    const newCard = await Card.create({
      name,
      stars,
      type,
      image,
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

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});