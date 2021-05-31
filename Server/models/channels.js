'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Channels extends Model {
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
      Channels.belongsTo(models.Teams, {
        foreignKey: 'team_id',
        onDelete: 'CASCADE'
      });
      Channels.hasMany(models.Messages, {
        foreignKey: 'channel_id',
        as: 'Messages'
      });
    }
  };
  Channels.init({
    // user_id: DataTypes.INTEGER,
    // team_id: DataTypes.INTEGER,
    type_: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Channels',
    tableName: 'channels'
  });
  return Channels;
};