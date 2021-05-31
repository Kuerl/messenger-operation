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
      Contacts.belongsTo(models.Accounts, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      });
      Contacts.hasMany(models.Messages, {
        foreignKey: 'contact_id',
        as: 'Messages'
      })
    }
  };
  Contacts.init({
    // user_id: {  
    //   allowNull: false,
    //   type: DataTypes.INTEGER
    // },
    nickname: {
      allowNull: true,
      type: DataTypes.STRING
    },
    friend: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Contacts',
    tableName: 'contacts'
  });
  return Contacts;
};