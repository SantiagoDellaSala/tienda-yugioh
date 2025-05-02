// models/User.js
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Relación 1:N: un usuario puede tener muchas cartas
      User.hasMany(models.Card, {
        foreignKey: 'userId', // Relación con las cartas
        as: 'cards'
      });
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};