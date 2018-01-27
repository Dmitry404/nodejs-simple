const db = require('../../conf/db.json')[process.env.NODE_ENV || 'development'];
const Sequelize = require('sequelize');

const sequelize = new Sequelize(db.database, db.username, db.password, {
  dialect: db.dialect,
  host: db.host,
  port: db.port,
});

const Book = require('./book')(sequelize);
const Author = require('./author')(sequelize);
const BookReview = require('./book_review')(sequelize);
const BookRate = require('./book_rate')(sequelize);
const User = require('./user')(sequelize);
const Role = require('./role')(sequelize);
const RolePermission = require('./role_permissions')(sequelize);

sequelize.define('authors_books', {}, {
  updatedAt: false,
  createdAt: false,
});
Book.belongsToMany(Author, { through: 'authors_books' });
Author.belongsToMany(Book, { through: 'authors_books' });

Book.hasMany(BookReview);
User.hasMany(BookReview);
BookReview.belongsTo(User);

Book.hasMany(BookRate);
User.hasMany(BookRate);

RolePermission.belongsTo(Role);

module.exports = {
  Book, Author, BookReview, BookRate, User, Role, RolePermission,
};
