'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Devices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Devices.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    mac_add: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    is_block: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Devices',
  });
  return Devices;
};