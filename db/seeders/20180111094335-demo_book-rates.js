module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('book_rates', [{
      rate: 3,
      bookId: 1, 
      userId: 1,
    }, {
      rate: 5,
      bookId: 1, 
      userId: 2,
    }, {
      rate: 4,
      bookId: 2, 
      userId: 1,
    }, {
      rate: 5,
      bookId: 3, 
      userId: 1,
    }, {
      rate: 4,
      bookId: 2, 
      userId: 2,
    }, {
      rate: 5,
      bookId: 7, 
      userId: 1,
    }, {
      rate: 2,
      bookId: 7, 
      userId: 2,
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('book_rates', null, {});
  }
};
