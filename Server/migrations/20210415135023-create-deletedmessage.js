'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Deletedmessages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Accounts',
          key: 'id',
          as: 'user_id',
        }
      },
      msg_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Messages',
          key: 'id',
          as: 'msg_id',
        }
      },
      att_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Attachments',
          key: 'id',
          as: 'att_id',
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Deletedmessages');
  }
};