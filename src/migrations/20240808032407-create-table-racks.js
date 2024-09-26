'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.createTable('racks', { 
      id_rack: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      description_rack:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      code_rack:{
        type: Sequelize.INTEGER,
        unique: true
      },
      acronym_rack: {
        type: Sequelize.STRING(1),
      },
      // fk_id_shelf:{
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   references:{
      //     model: 'shelfs',
      //     key: 'id_shelf'
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
    
    await queryInterface.dropTable('racks');
    
  }
};
