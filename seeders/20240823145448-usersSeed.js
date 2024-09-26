'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('users', [{
      username: 'administ',
      password: 54321,
      is_logged_user: false,
      fk_id_privilege: 1,
      created_at: new Date(),
      updated_at: new Date(),
     }], {});

  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('users', null, {});
    
  }
};
