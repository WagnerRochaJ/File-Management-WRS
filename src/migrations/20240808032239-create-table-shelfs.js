'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('shelfs', { 
      id_shelf: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      description_shelf:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      code_shelf:{
        type: Sequelize.INTEGER,
        unique: true
      },
      acronym_shelf: {
        type: Sequelize.STRING(1),
      },
      // fk_id_corridor:{
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   references:{
      //     model: 'corridors',
      //     key: 'id_corridor'
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
    
    await queryInterface.dropTable('shelfs');
    
  }
};
