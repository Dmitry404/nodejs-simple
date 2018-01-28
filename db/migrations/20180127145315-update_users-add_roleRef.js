module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'roleId', {
      type: Sequelize.INTEGER,
    }, { defaultValue: 1 })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'roleId');
  }
};
