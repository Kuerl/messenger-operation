'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Channelparticular extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Channels.belongsTo(models.Accounts, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      });
      Channels.belongsTo(models.Channels, {
        foreignKey: 'channel_id',
        onDelete: 'CASCADE'
      });
    }
  };
  Channelparticular.init({
    // user_id: DataTypes.INTEGER,
    // channel_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Channelparticular',
    tableName: 'channelparticular'
  });
  return Channelparticular;
};