'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.createTable('type_documents', {
      id_type_document: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      description_type_document:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      code_type_document:{
        type: Sequelize.INTEGER,
        unique: true
      },
      acronym_type_document: {
        type: Sequelize.STRING(3),
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
    
    await queryInterface.dropTable('type_documents');
  }
};
