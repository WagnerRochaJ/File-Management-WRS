'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.createTable('sectors', { 
      id_sector: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      description_sector:{
        type: Sequelize.TEXT('tiny')
      },
      code_sector:{
        type: Sequelize.SMALLINT
      },
      // fk_id_privilege:{
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   references:{
      //     model: 'privileges',
      //     key: 'id_privilege'
      //   }
      // },
      // fk_id_company:{
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   references:{
      //     model: 'companys',
      //     key: 'id_company'},
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
    
    await queryInterface.dropTable('sectors');
    
  }
};
