// models/CartItem.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    static associate(models) {
      // Relación con el modelo Cart
      CartItem.belongsTo(models.Cart, {
        foreignKey: 'cartId',
        as: 'cart',
      });

      // Relación con el modelo Card
      CartItem.belongsTo(models.Card, {
        foreignKey: 'productId',
        as: 'card',
      });
    }
  }

  CartItem.init({
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Carts', // Se refiere al modelo Cart
        key: 'id'
      }
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Cards', // Se refiere al modelo Card
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    modelName: 'CartItem',
  });

  return CartItem;
};
