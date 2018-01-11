module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'secret',
    },
    {
      id: 2,
      name: 'Jane Roe',
      email: 'jane.roe@example.com',
      password: 'secret',
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
