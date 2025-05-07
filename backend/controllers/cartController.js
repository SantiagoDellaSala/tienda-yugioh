const { Cart, CartItem, Card } = require('../models');

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      where: { userId: req.userId },
      include: [{ model: Card, as: 'products', attributes: ['id', 'name', 'price', 'image'], through: { attributes: ['quantity'] } }]
    });
    if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });
    res.json(cart);
  } catch {
    res.status(500).json({ message: 'Error al obtener el carrito' });
  }
};

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ where: { userId: req.userId } }) || await Cart.create({ userId: req.userId });

    const item = await CartItem.findOne({ where: { cartId: cart.id, productId } });
    item ? (item.quantity += quantity && await item.save()) : await CartItem.create({ cartId: cart.id, productId, quantity });

    res.status(201).json({ message: 'Producto agregado al carrito' });
  } catch {
    res.status(500).json({ message: 'Error al agregar al carrito' });
  }
};

exports.updateQuantity = async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  try {
    const cart = await Cart.findOne({ where: { userId: req.userId } });
    const item = await CartItem.findOne({ where: { cartId: cart.id, productId } });

    if (!item) return res.status(404).json({ message: 'Producto no encontrado' });

    item.quantity = quantity;
    await item.save();
    res.status(200).json({ message: 'Cantidad actualizada' });
  } catch {
    res.status(500).json({ message: 'Error al actualizar cantidad' });
  }
};

exports.removeFromCart = async (req, res) => {
  const { productId } = req.params;
  try {
    const cart = await Cart.findOne({ where: { userId: req.userId } });
    const item = await CartItem.findOne({ where: { cartId: cart.id, productId } });
    if (!item) return res.status(404).json({ message: 'Producto no encontrado' });

    await item.destroy();
    res.status(200).json({ message: 'Producto eliminado del carrito' });
  } catch {
    res.status(500).json({ message: 'Error al eliminar del carrito' });
  }
};
