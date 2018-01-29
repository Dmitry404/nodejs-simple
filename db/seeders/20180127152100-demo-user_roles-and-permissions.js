module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('roles', [{
      id: 1,
      name: 'user',
    },
    {
      id: 2,
      name: 'admin',
    }], {}).then(() => {
      return queryInterface.bulkInsert('role_permissions', [
        {
          id: 1,
          roleId: 1,
          route: '/books',
          method: 'GET',
        },{
          id: 2,
          roleId: 1,
          route: '/books/:bookId(\\d+)',
          method: 'GET',
        },{
          id: 3,
          roleId: 1,
          route: '/books/:bookId(\\d+)/reviews',
          method: 'GET',
        },{
          id: 4,
          roleId: 1,
          route: '/books/:bookId(\\d+)/rates',
          method: 'GET',
        },{
          id: 5,
          roleId: 1,
          route: '/books/most-reviewed/:limit(\\d+)?',
          method: 'GET',
        },{
          id: 6,
          roleId: 1,
          route: '/books/by-author/:authorId(\\d+)',
          method: 'GET',
        },{
          id: 7,
          roleId: 1,
          route: '/books/by-rate/:from([1-5])-:to([1-5]',
          method: 'GET',
        },{
          id: 8,
          roleId: 1,
          route: '/authors/by-book-rate/:from([1-5])-:to([1-5]',
          method: 'GET',
        },{
          id: 9,
          roleId: 2,
          route: '(.*)',
          method: '*',
        },
      ], {})
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('roles', null, {});
  }
};
