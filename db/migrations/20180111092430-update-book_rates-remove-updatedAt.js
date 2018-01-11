module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('book_rates', 'updatedAt');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('book_rates', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
    })
  }
};
