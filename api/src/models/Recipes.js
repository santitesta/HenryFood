const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipes', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: 'bro'
    },
    points: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'default bro'
    },
    healthness: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'default brodddi'
    },
    steps: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: 'default broderson'
    },
    img: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  },
  {timestamps: false}
  );
};