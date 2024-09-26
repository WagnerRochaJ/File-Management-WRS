'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.createTable('corridors', { 
      id_corridor: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      description_corridor:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      code_corridor:{
        type: Sequelize.INTEGER,
        unique: true
      },
      acronym_corridor: {
        type: Sequelize.STRING(1),
      },
      // fk_id_arquivo:{
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   references:{
      //     model: 'arquivos',
      //     key: 'id_arquivo'
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
    
    await queryInterface.dropTable('corridors');
  }
};
