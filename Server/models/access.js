'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Access extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Access.init({
    user_id: DataTypes.INTEGER,
    device_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Access',
  });
  return Access;
};