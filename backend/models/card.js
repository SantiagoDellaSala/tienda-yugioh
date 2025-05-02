// models/Card.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    static associate(models) {
      // Aquí podrías definir asociaciones si las necesitas
    }
  }

  Card.init({
    // El ID se genera automáticamente por Sequelize
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Auto-incrementable para obtener un ID único
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    element: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    userId: { // Relación con el User
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Card',
  });

  return Card;
};