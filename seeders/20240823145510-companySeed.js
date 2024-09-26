'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('companys', [{
    name_company: 'Johnny walker',
    description_company: 'fabricante de bebidas',
    created_at: new Date(),
    updated_at: new Date(),
    }], {});

  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('companys', null, {});
  }
};
