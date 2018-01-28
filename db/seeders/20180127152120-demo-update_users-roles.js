module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('UPDATE `users` AS `User` SET `User`.`roleId` = 1 WHERE `User`.`roleId` IS NULL');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('UPDATE `users` AS `User` SET `User`.`roleId` = NULL WHERE `User`.`roleId` = 2');
  }
};
