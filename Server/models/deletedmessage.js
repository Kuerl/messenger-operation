'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Deletedmessage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Deletedmessage.init({
    user_id: DataTypes.INTEGER,
    msg_id: DataTypes.INTEGER,
    att_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Deletedmessage',
  });
  return Deletedmessage;
};