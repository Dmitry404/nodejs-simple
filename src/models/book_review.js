const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('book_review', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    comment: Sequelize.STRING,
  });
};
