const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const BookReview = sequelize.define('book_review', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    comment: Sequelize.STRING,
  });
  return BookReview;
};
