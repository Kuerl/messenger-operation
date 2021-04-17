'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Access extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Access.belongsTo(models.Accounts, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      });
      Access.belongsTo(models.Devices, {
        foreignKey: 'device_id',
        onDelete: 'CASCADE'
      });
    }
  };
  Access.init({
    // user_id: {
    //   allowNull: false,
    //   type: DataTypes.INTEGER
    // },
    // device_id: {
    //   allowNull: false,
    //   type: DataTypes.INTEGER
    // }
  }, {
    sequelize,
    modelName: 'Access',
    tableName: 'access'
  });
  return Access;
};