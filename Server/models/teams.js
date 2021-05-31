'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Teams extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Teams.belongsTo(models.Accounts, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      });
      // hasMany - Teamparticular
      Teams.hasMany(models.Teamparticular, {
        foreignKey: 'team_id',
        as: 'Teamparticular'
      });
      // hasMany - Channels
      Teams.hasMany(models.Channels, {
        foreignKey: 'team_id',
        as: 'Channels'
      });
    }
  };
  Teams.init({
    // user_id: {
    //   allowNull: false,
    //   type: DataTypes.INTEGER
    // },
    title: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Teams',
    tableName: 'teams'
  });
  return Teams;
};