'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.addColumn("users_sectors", "fk_id_sector", {
      type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'sectors',
          key: 'id_sector'
        }
    });
     await queryInterface.addColumn("users_sectors", "fk_id_user", {
      type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id_user'
        }
    });
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.removeColumn('users_sectors','fk_id_user');
    await queryInterface.removeColumn('users_sectors','fk_id_sector');
  }
};
