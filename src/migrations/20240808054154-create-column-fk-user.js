"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "fk_id_privilege", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "privileges",
        key: "id_privilege",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("users", "fk_id_privilege");
  },
};
