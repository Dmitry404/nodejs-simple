module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('books', [
      {
        id: 1,
        title: 'Head First HTML and CSS: A Learner\'s Guide to Creating Standards-Based Web Pages',
        isbn: '978-0596159900',
        edition: '2nd Edition',
        published: 2012,
        description: '',
        language: 'English',
        pages: 768,
        publisher: 'O\'Reilly Media',
        cover: 'head_first_html.png',
        createdAt: new Date(), 
        updatedAt: new Date()
      },
      {
        id: 2,
        title: 'Head First Object-Oriented Analysis and Designs',
        isbn: '978-0596008673',
        edition: '1nd Edition',
        published: 2006,
        description: '',
        language: 'English',
        pages: 636,
        publisher: 'O\'Reilly Media',
        cover: 'head_first_ood.png',
        createdAt: new Date(), 
        updatedAt: new Date()
      },
      {
        id: 3,
        title: 'Head First Java: Your Brain on Java - A Learner\'s Guide',
        isbn: '978-0596004651',
        edition: '1nd Edition',
        published: 2003,
        description: '',
        language: 'English',
        pages: 656,
        publisher: 'O\'Reilly Media',
        cover: 'head_first_java.png',
        createdAt: new Date(), 
        updatedAt: new Date()
      },
      {
        id: 4,
        title: 'Head First Java',
        isbn: '978-0596009205',
        edition: '2nd Edition',
        published: 2005,
        description: '',
        language: 'English',
        pages: 688,
        publisher: 'O\'Reilly Media',
        cover: 'head_first_java_2nd.png',
        createdAt: new Date(), 
        updatedAt: new Date()
      },
      {
        id: 5,
        title: 'Head First JavaScript Programming: A Brain-Friendly Guide',
        isbn: '978-1449340131',
        edition: '1nd Edition',
        published: 2014,
        description: '',
        language: 'English',
        pages: 702,
        publisher: 'O\'Reilly Media',
        cover: 'head_first_javascript.png',
        createdAt: new Date(), 
        updatedAt: new Date()
      },
      {
        id: 6,
        title: 'Head First Design Patterns: A Brain-Friendly Guide',
        isbn: '978-0596007126',
        edition: '1nd Edition',
        published: 2004,
        description: '',
        language: 'English',
        pages: 694,
        publisher: 'O\'Reilly Media',
        cover: 'head_first_design_patterns.png',
        createdAt: new Date(), 
        updatedAt: new Date()
      }, 
      {
        id: 7,
        title: 'Inside the Machine: An Illustrated Introduction to Microprocessors and Computer Architecture',
        isbn: '978-1593276683',
        edition: '1nd Edition',
        published: 2015,
        description: '',
        language: 'English',
        pages: 320,
        publisher: 'No Starch Press',
        cover: 'inside_the_machine.png',
        createdAt: new Date(), 
        updatedAt: new Date()
      },
    ]).then(() => {
      return queryInterface.bulkInsert('authors', [
        {
          id: 1,
          name: 'Elisabeth Robson', 
          createdAt: new Date()
        },
        {
          id: 2,
          name: 'Eric Freeman', 
          createdAt: new Date()
        },
        {
          id: 3,
          name: 'Brett D. McLaughlin', 
          createdAt: new Date()
        },
        {
          id: 4,
          name: 'Gary Pollice', 
          createdAt: new Date()
        },
        {
          id: 5,
          name: 'Dave West', 
          createdAt: new Date()
        },
        {
          id: 6,
          name: 'Bert Bates', 
          createdAt: new Date()
        },
        {
          id: 7,
          name: 'Kathy Sierra', 
          createdAt: new Date()
        },
        {
          id: 8,
          name: 'Eric T. Freeman', 
          createdAt: new Date()
        },
        {
          id: 9,
          name: 'Jon Stokes', 
          createdAt: new Date()
        },
      ], {})
    }).then(() => {
      return queryInterface.bulkInsert('authors_books', [
        {
          bookId: 1,
          authorId: 1
        },
        {
          bookId: 1,
          authorId: 2
        },
        {
          bookId: 2,
          authorId: 3
        },
        {
          bookId: 2,
          authorId: 4
        },
        {
          bookId: 2,
          authorId: 5
        },
        {
          bookId: 3,
          authorId: 6
        },
        {
          bookId: 3,
          authorId: 7
        },
        {
          bookId: 4,
          authorId: 6
        },
        {
          bookId: 4,
          authorId: 7
        },
        {
          bookId: 5,
          authorId: 8
        },
        {
          bookId: 5,
          authorId: 1
        },
        {
          bookId: 6,
          authorId: 1
        },
        {
          bookId: 6,
          authorId: 2
        },
        {
          bookId: 6,
          authorId: 6
        },
        {
          bookId: 6,
          authorId: 7
        },
        {
          bookId: 7,
          authorId: 9
        },
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('books', null, {})
      .then(() => queryInterface.bulkDelete('authors', null, {}));
  }
};
