const { Card, User } = require('../models');

exports.getCards = async (req, res) => {
  try {
    const cards = await Card.findAll({
      include: [{ model: User, as: 'user', attributes: ['id', 'firstName', 'lastName', 'email'] }]
    });
    res.json(cards);
  } catch (error) {
    console.error('Error al obtener las cartas:', error);
    res.status(500).json({ message: 'Error al obtener las cartas' });
  }
};

exports.createCard = async (req, res) => {
  const { name, stars, type, element, description, code, price } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const newCard = await Card.create({
      name, stars, type, element, description, code, price, image: imageUrl, userId: req.userId
    });
    res.status(201).json(newCard);
  } catch (error) {
    console.error('Error al crear la carta:', error);
    res.status(500).json({ message: 'Error al crear la carta' });
  }
};
