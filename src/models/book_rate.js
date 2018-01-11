const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const BookRate = sequelize.define('book_rate', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rate: {
      type: Sequelize.TINYINT,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 5,
      },
    },
  }, {
    updatedAt: false,
  });
  return BookRate;
};
