module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      id: 5,
      name: 'Administrator',
      email: 'admin@example.com',
      password: 'secret',
      roleId: 2,
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', {
      id: 5,
    });
  }
};
