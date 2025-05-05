// models/Cart.js
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      Cart.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });

      Cart.belongsToMany(models.Card, {
        through: 'CartItems', // Tabla intermedia que conecta Cart con Card
        foreignKey: 'cartId',
        as: 'products',
      });
    }
  }

  Cart.init({
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart',
  });

  return Cart;
};
