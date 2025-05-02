// server.js
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Usamos JWT para la autenticación
const { User, Card } = require('./models'); // Asumimos que tienes modelos User y Card para manejar los usuarios y las cartas
require('dotenv').config(); // Para leer variables de entorno desde .env

// Creamos una instancia de Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Permite solicitudes desde el frontend
app.use(express.json()); // Para manejar los datos JSON enviados en el cuerpo de las solicitudes

// Ruta de prueba (verifica que el servidor está funcionando)
app.get('/', (req, res) => {
  res.send('¡Backend funcionando!');
});

// Ruta de registro
app.post('/api/register', async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  // Verificar si el usuario ya existe
  const userExists = await User.findOne({ where: { email } });
  if (userExists) {
    return res.status(400).json({ message: 'El usuario ya existe' });
  }

  // Hash de la contraseña
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

  // Verificar la contraseña
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Credenciales incorrectas' });
  }

  // Generar el JWT token
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET, // Clave secreta para firmar el token desde .env
    { expiresIn: '1h' } // El token expira en 1 hora
  );

  res.json({ token });
});

// Ruta API para obtener todas las cartas
app.get('/api/cards', async (req, res) => {
  try {
    const cards = await Card.findAll();
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
  const userId = req.userId; // Obtenido desde el middleware

  try {
    const newCard = await Card.create({
      name,
      stars,
      type,
      image,
      element,
      description,
      code,
      userId, // Asociamos la carta al usuario logueado
    });

    res.status(201).json(newCard); // Devolvemos la carta creada (incluido su ID generado)
  } catch (error) {
    console.error('Error al crear la carta:', error);
    res.status(500).json({ message: 'Error al crear la carta' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});