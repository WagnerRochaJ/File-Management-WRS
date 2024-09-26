'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.createTable('boxes', {
      id_box: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      description_box:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      code_box:{
        type: Sequelize.INTEGER,
        unique: true
      },
      // fk_id_rack:{
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   references:{
      //     model: 'racks',
      //     key: 'id_rack'
      //   }
      // },
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
    await queryInterface.dropTable('boxes');
    
  }
};
