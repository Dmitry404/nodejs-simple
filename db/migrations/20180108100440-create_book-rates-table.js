module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('book_rates', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        rate: Sequelize.INTEGER,
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        bookId: {
          type: Sequelize.INTEGER,
          references: { 
            model: 'books',
            key: 'id',
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
        },
        userId: {
          type: Sequelize.INTEGER,
          references: { 
            model: 'users',
            key: 'id',
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
        }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('book_rates');
  }
};
