"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("sectors", "fk_id_privilege", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "privileges",
        key: "id_privilege",
      },
    });
    await queryInterface.addColumn("sectors", "fk_id_company", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "companys",
        key: "id_company",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("sectors", "fk_id_privilege");
    await queryInterface.removeColumn("sectors", "fk_id_company");
  },
};
