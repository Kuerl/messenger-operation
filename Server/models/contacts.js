'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contacts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Contacts.init({
    user_id: DataTypes.INTEGER,
    nickname: DataTypes.STRING,
    is_friend: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Contacts',
  });
  return Contacts;
};