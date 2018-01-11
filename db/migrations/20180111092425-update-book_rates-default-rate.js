module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('book_rates', 'rate', {
      type: Sequelize.TINYINT,
      allowNull: false,
      defaultValue: 0,
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('book_rates', 'rate', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
    })
  }
};
