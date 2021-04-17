'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Devices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Devices.belongsTo(models.Accounts, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      });
      // hasMany - Access
      Devices.hasMany(models.Access, {
        foreignKey: 'device_id',
        as: 'Access'
      })
    }
  };
  Devices.init({
    // user_id: {
    //   allowNull: false,
    //   type: DataTypes.INTEGER
    // },
    mac_add: {
      allowNull: true,
      unique: true,
      type: DataTypes.STRING
    },
    is_block: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'Devices',
    tableName: 'dedvices'
  });
  return Devices;
};