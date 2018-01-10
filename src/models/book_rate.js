const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('book_rate', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rate: Sequelize.INTEGER,
  });
};
