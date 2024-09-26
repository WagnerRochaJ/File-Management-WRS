'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.createTable('privileges', {
      id_privilege: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      level_privilege:{
        type: Sequelize.SMALLINT,
        allowNull: false
      },
      name_privilege:{
        type: Sequelize.STRING(30)
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
    
    await queryInterface.dropTable('privileges');
    
  }
};
