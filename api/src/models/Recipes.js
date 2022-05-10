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
      defaultValue: 'No summary available'
    },
    points: {
      type: DataTypes.STRING,
      defaultValue: '-'
    },
    healthness: {
      type: DataTypes.STRING,
      defaultValue: '-'
    },
    steps: {
      type: DataTypes.TEXT,
      defaultValue: 'No steps defined'
    },
    image: {
      type: DataTypes.TEXT,
      defaultValue: 'No image presented'
    }
  },
  {timestamps: false}
  );
};