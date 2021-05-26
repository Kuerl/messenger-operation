'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Messages.belongsTo(models.Accounts, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      });
      Messages.belongsTo(models.Contacts, {
        foreignKey: 'contact_id',
        onDelete: 'CASCADE'
      });
      Messages.belongsTo(models.Channels, {
        foreignKey: 'channel_id',
        onDelete: 'CASCADE'
      });
      Messages.belongsTo(models.Attachments, {
        foreignKey: 'att_id',
        onDelete: 'CASCADE'
      });
      // hasOne - Deletedmessage
      Messages.hasOne(models.Deletedmessage, {
        foreignKey: 'msg_id',
        as: 'Deletedmessage'
      });
    }
  };
  Messages.init({
    // user_id: DataTypes.INTEGER,
    // contact_id: DataTypes.INTEGER,
    // team_id: DataTypes.INTEGER,
    messages_att: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
    // att_id: {
    //   allowNull: true,
    //   type: DataTypes.INTEGER
    // },
    message_: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Messages',
    tableName: 'messages'
  });
  return Messages;
};