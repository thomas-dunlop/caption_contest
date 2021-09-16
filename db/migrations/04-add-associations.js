'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
     return queryInterface.addColumn(
      'Captions', 
      'image_id', 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Images', 
          key: 'id',
        }
      }
    )
    .then(() => {
      return queryInterface.addColumn(
        'Captions', 
        'user_id', 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Users', 
            key: 'id',
          }
        })
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Captions',
      'image_id')
    .then(() => {
      return queryInterface.removeColumn(
        'Captions',
        'user_id')
    })
  }
};
