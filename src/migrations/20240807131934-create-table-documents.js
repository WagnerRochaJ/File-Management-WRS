'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.createTable('documents', { 
      id_document: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      number_document:{
        type: Sequelize.SMALLINT,
      },
      content_document:{
        type: Sequelize.TEXT
      },
      data_document:{
        type: Sequelize.DATEONLY
      },
      year_office:{
        type: Sequelize.STRING(1)
      },
      data_destruction:{
        type: Sequelize.DATEONLY
      },
      observation_document: {
        type: Sequelize.TEXT
      },
      // fk_id_status:{
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   references:{
      //     model: 'status',
      //     key: 'id_status'
      //   }
      // },
      // fk_id_typedocument:{
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   references:{
      //     model: 'type_documents',
      //     key: 'id_type_document'
      //   }
      // },
      // fk_id_company:{
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   references:{
      //     model: 'companys',
      //     key: 'id_company'
      //   } 
      // },
      // fk_id_arquivo:{
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   references:{
      //     model: 'arquivos',
      //     key: 'id_arquivo'
      //   }
      // },
      // fk_id_sector:{
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   references:{
      //     model: 'sectors',
      //     key: 'id_sector'
      //   }
      // },
      // fk_id_box:{
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   references:{
      //     model: 'boxes',
      //     key: 'id_box'
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
    
    await queryInterface.dropTable('documents');
  }
};
