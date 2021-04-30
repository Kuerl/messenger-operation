'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Teamparticular extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Teamparticular.belongsTo(models.Accounts, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      });
      Teamparticular.belongsTo(models.Teams, {
        foreignKey: 'team_id',
        onDelete: 'CASCADE'
      });
    }
  };
  Teamparticular.init({
    // user_id: DataTypes.INTEGER,
    // team_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Teamparticular',
    tableName: 'teamparticular'
  });
  return Teamparticular;
};