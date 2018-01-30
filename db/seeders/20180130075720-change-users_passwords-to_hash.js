module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('UPDATE `users` AS `User` SET `User`.`password` = "$2a$10$Ltfy7cXZQfI.dP7mAstoKOLX0R4MQRq/I3gbc5QzXKBG2i7oCit/W"');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('UPDATE `users` AS `User` SET `User`.`password` = "secret"');
  }
};
