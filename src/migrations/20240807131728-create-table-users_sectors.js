'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.createTable('users_sectors', { 
      // fk_id_user: {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: 'users',
      //     key: 'id_user'
      //   }
      // },
      // fk_id_sector: {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: 'sectors',
      //     key: 'id_sector'
      //   }
      //},
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }   
    });
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.dropTable('users_sectors');
  }
};
