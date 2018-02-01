module.exports = {
  development: {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3360,
    username: 'librarian',
    password: 'secret',
    database: 'bookshelf',
  },
  test: {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3360,
    username: 'root',
    password: '$eCReT',
    database: 'test_bookshelf',
  },
  production: {
    dialect: 'mysql',
    host: 'nodejs-bookshelf-db-prod',
    port: 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  }
};
