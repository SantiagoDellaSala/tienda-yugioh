'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Card.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL,
    race: DataTypes.STRING,
    rarity: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Card',
  });
  Card.associate = function(models) {
    Card.belongsToMany(models.Cart, {
      through: 'CartItems',
      foreignKey: 'productId',
      as: 'carts'
    });
  };
  
  return Card;
};