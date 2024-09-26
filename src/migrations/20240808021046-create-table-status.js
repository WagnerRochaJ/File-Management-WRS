'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.createTable('status', { 
      id_status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      description_status:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      code_status:{
        type: Sequelize.INTEGER,
        unique: true
      },
      in_possesion_third: {
        type: Sequelize.BOOLEAN,
      },
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
   
    await queryInterface.dropTable('status');
  }
};
