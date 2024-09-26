"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "privileges",
      [
        {
          level_privilege: 1,
          name_privilege: "Usuário Básico",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          level_privilege: 2,
          name_privilege: "Usuário Avançado",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          level_privilege: 3,
          name_privilege: "Administrador",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("privilegios", null, {});
  },
};
