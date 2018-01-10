const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('book', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: Sequelize.STRING,
    isbn: Sequelize.STRING,
    edition: Sequelize.STRING,
    published: Sequelize.SMALLINT(4),
    description: Sequelize.STRING,
    language: Sequelize.STRING,
    pages: Sequelize.SMALLINT,
    publisher: Sequelize.STRING,
    cover: Sequelize.STRING,
  });
};
