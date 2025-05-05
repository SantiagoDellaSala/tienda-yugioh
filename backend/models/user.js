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
        as: 'cards'           // Alias para la relación
      });
    }
  }
  
  // Definir el modelo de User, incluyendo el id como clave primaria
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,  // Indicamos que este campo es la clave primaria
      autoIncrement: true,  // El valor se incrementará automáticamente
      allowNull: false, // No puede ser nulo
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,  // Para evitar duplicados
    },
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
