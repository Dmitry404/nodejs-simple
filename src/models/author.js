const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('author', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: Sequelize.STRING,
  }, {
    updatedAt: false,
  });
};
