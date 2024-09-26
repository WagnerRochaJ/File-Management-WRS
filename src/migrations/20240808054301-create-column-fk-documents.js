'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.addColumn("documents", "fk_id_status", {
      type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'status',
          key: 'id_status'
        }
    });
    await queryInterface.addColumn("documents", "fk_id_typedocument", {
      type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'type_documents',
          key: 'id_type_document'
        }
    });
    await queryInterface.addColumn("documents", "fk_id_company", {
      type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'companys',
          key: 'id_company'
        } 
    });
    await queryInterface.addColumn("documents", "fk_id_arquivo", {
      type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'arquivos',
          key: 'id_arquivo'
        }
    });
    await queryInterface.addColumn("documents", "fk_id_sector", {
      type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'sectors',
          key: 'id_sector'
        }
    });
    await queryInterface.addColumn("documents", "fk_id_box", {
      type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'boxes',
          key: 'id_box'
        }
    });
    
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.removeColumn('documents','fk_id_status');
    await queryInterface.removeColumn('documents','fk_id_typedocument');
    await queryInterface.removeColumn('documents','fk_id_company');
    await queryInterface.removeColumn('documents','fk_id_arquivo');
    await queryInterface.removeColumn('documents','fk_id_sector');
    await queryInterface.removeColumn('documents','fk_id_box');

    
  }
};
