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
      Deletedmessage.belongsTo(models.Accounts, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      });
      Deletedmessage.belongsTo(models.Messages, {
        foreignKey: 'msg_id',
        onDelete: 'CASCADE'
      });
      Deletedmessage.belongsTo(models.Attachments, {
        foreignKey: 'att_id',
        onDelete: 'CASCADE'
      });
    }
  };
  Deletedmessage.init({
    // user_id: DataTypes.INTEGER,
    // msg_id: DataTypes.INTEGER,
    // att_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Deletedmessage',
    tableName: 'deletedmessage'
  });
  return Deletedmessage;
};