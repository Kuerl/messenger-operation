'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Accounts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // hasMany - Varification
      Accounts.hasMany(models.Varification, {
        foreignKey: 'user_id',
        as: 'Varification'
      });
      // hasMany - Devices
      Accounts.hasMany(models.Devices, {
        foreignKey: 'user_id',
        as: 'Devices'
      });
      // hasMany - Access
      Accounts.hasMany(models.Access, {
        foreignKey: 'user_id',
        as: 'Access'
      });
      // hasMany - Contacts
      Accounts.hasMany(models.Contacts, {
        foreignKey: 'user_id',
        as: 'Contacts'
      });
      // hasMany - Teams
      Accounts.hasMany(models.Teams, {
        foreignKey: 'user_id',
        as: 'Teams'
      });
      Accounts.hasMany(models.Attachments, {
        foreignKey: 'user_id',
        as: 'Attachments'
      });
      
      Accounts.hasMany(models.Teamparticular, {
        foreignKey: 'user_id',
        as: 'Teamparticular'
      });
      Accounts.hasMany(models.Channels, {
        foreignKey: 'user_id',
        as: 'Channels'
      });
      Accounts.hasMany(models.Channelparticular, {
        foreignKey: 'user_id',
        as: 'Channelparticular'
      });
      Accounts.hasMany(models.Messages, {
        foreignKey: 'user_id',
        as: 'Messages'
      });
      Accounts.hasMany(models.Deletedmessage, {
        foreignKey: 'user_id',
        as: 'Deletedmessage'
      });
    }
  };
  Accounts.init({
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    block_count: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    is_block: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'accounts',
    modelName: 'Accounts',
  });
  return Accounts;
};