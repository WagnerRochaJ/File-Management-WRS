'use strict';

const { SELECT } = require('sequelize/lib/query-types');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.createTable('companys', { 
      id_company: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name_company: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      description_company: {
        type: Sequelize.TEXT('tiny')
      },
      code_company:{
        type: Sequelize.SMALLINT
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
    
    await queryInterface.dropTable('companys');
    
  }
};
