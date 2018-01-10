module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('authors_books', {
        authorId: {
          type: Sequelize.INTEGER,
          references: { 
            model: 'authors',
            key: 'id',
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
        },
        bookId: {
          type: Sequelize.INTEGER,
          references: { 
            model: 'books',
            key: 'id',
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
        }
    }).then(() => {
      queryInterface.addConstraint('authors_books', ['authorId', 'bookId'], {
        type: 'PRIMARY KEY'
     });
    }).then(() => {
      queryInterface.addIndex('authors_books', ['bookId'], {})
    }).then(() => {
      queryInterface.addIndex('authors_books', ['authorId'], {})
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('authors_books');
  }
};
