module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('books', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
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
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
    })
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('books');
  }
};
