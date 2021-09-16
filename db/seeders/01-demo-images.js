'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Images', [
      {file: 'https://www.instagram.com/p/COeYM2cBr0x/?utm_source=ig_web_copy_link', createdAt: new Date(), updatedAt: new Date()}, 
      {file: 'https://www.instagram.com/p/COMF_IUBxLb/?utm_source=ig_web_copy_link', createdAt: new Date(), updatedAt: new Date()},
      {file: 'https://www.instagram.com/p/CNStDTiBttL/?utm_source=ig_web_copy_link', createdAt: new Date(), updatedAt: new Date()}, 
      {file: 'https://www.instagram.com/p/CLk9Od0BkbS/?utm_source=ig_web_copy_link', createdAt: new Date(), updatedAt: new Date()},
      {file: 'https://www.instagram.com/p/CR2cKh_H_Hk/?utm_source=ig_web_copy_link', createdAt: new Date(), updatedAt: new Date()}]
    )},

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Images', null, {});
  }
}
