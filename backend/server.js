const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const cardRoutes = require('./routes/cardRoutes');
const cartRoutes = require('./routes/cartRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

// Rutas
app.use('/api', authRoutes);
app.use('/api/cards', cardRoutes);
app.use('/api/cart', cartRoutes);

app.get('/', (req, res) => res.send('¡Backend funcionando!'));

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
