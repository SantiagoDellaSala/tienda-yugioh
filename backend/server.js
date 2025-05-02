// Importamos las dependencias necesarias
const express = require('express'); // Para crear el servidor
const cors = require('cors'); // Para habilitar CORS
const { Card } = require('./models'); // Para interactuar con el modelo de la base de datos

// Creamos una instancia de Express
const app = express();

// Middleware
app.use(cors()); // Permite solicitudes desde el frontend (importante cuando el frontend y backend están en puertos distintos)
app.use(express.json()); // Para poder manejar los datos JSON enviados en el cuerpo de las solicitudes

// Definimos el puerto en el que va a correr el servidor
const PORT = process.env.PORT || 5000; // Si tienes una variable de entorno PORT, la usará. Si no, usará el puerto 5000

// Ruta de prueba (verifica que el servidor está funcionando)
app.get('/', (req, res) => {
  res.send('¡Backend funcionando!');
});

// Ruta API para obtener todas las cartas
app.get('/api/cards', async (req, res) => {
  try {
    // Usamos el modelo de Sequelize para obtener todas las cartas
    const cards = await Card.findAll(); // Sequelize nos devuelve todas las cartas de la base de datos
    res.json(cards); // Respondemos con las cartas en formato JSON
  } catch (error) {
    console.error('Error al obtener las cartas:', error);
    res.status(500).json({ message: 'Error al obtener las cartas' });
  }
});

// Iniciamos el servidor en el puerto configurado
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
