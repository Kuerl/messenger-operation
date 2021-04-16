'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attachments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Attachments.init({
    user_id: DataTypes.INTEGER,
    thumb_url: DataTypes.STRING,
    file_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Attachments',
  });
  return Attachments;
};