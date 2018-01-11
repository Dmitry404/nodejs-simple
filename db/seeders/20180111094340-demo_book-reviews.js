module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('book_reviews', [{
      comment: 'I always was sure that HTML was designed for monkeys and by monkeys. However this book has changed my mind. Rating it with 3 start only because I\m afraid to become to stick to frontend stuff.',
      bookId: 1, 
      userId: 1,
    }, {
      comment: 'Great book! I\'ve learnt a lot from it',
      bookId: 1, 
      userId: 2,
    }, {
      comment: 'I like it. Guides you to OO design basics in a pretty well manner.',
      bookId: 2, 
      userId: 1,
    }, {
      comment: 'Java rules. Nuff said more',
      bookId: 3, 
      userId: 1,
    }, {
      comment: 'I love this book. Should I thanks God for inspiring Netscape to develop such a beautiful langauge.',
      bookId: 5, 
      userId: 2,
    }, {
      comment: 'Didn\'t read whole book yet, but the beggining looks promising',
      bookId: 7, 
      userId: 1,
    }, {
      comment: 'Oh my Gosh! Don\'t even dare to open this book. Try something else like HTML which is much simpler to learn.',
      bookId: 7, 
      userId: 2,
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('book_reviews', null, {});
  }
};
