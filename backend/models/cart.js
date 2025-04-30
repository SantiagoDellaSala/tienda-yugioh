'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
  Cart.associate = function(models) {
    Cart.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  
    Cart.belongsToMany(models.Card, {
      through: 'CartItems',
      foreignKey: 'cartId',
      as: 'products'
    });
  };
  
  
  return Cart;
};