const express = require('express');
const Sequelize = require('sequelize');
const {
  Book, Author, BookRate, BookReview, User,
} = require('../models');

const books = express.Router();

books.get('/', (req, res, next) => {
  Book.findAll({
    include: [{
      model: Author,
      attributes: ['name'],
    }, {
      model: BookRate,
      attributes: [],
    }],
    attributes: ['title', [Sequelize.fn('AVG', Sequelize.col('book_rates.rate')), 'avg_rate']],
    group: ['book.id'],
  }).then((result) => {
    res.json(result);
  }).catch((err) => {
    next(err);
  });
});

books.post('/', (req, res, next) => {
  const {
    title, isbn, edition, published, description,
    pages, publisher, authors,
  } = req.body;

  Book.create({
    title, isbn, edition, published, description, pages, publisher,
  }).then((book) => {
    book.addAuthors(authors);
    res.status(201).json(book);
  }).catch((err) => {
    next(err);
  });
});

books.put('/:bookId(\\d+)', (req, res, next) => {
  const { bookId } = req.params;
  const {
    title, isbn, edition, published, description,
    pages, publisher, authors,
  } = req.body;

  Book.update({
    title, isbn, edition, published, description, pages, publisher,
  }, {
    where: { id: bookId },
  }).then(() => {
    if (Array.isArray(authors)) {
      Book.findById(bookId, {
        attributes: ['id'],
      }).then((book) => {
        book.setAuthors([]);
        book.addAuthors(authors);
      });
    }
    res.status(204).end();
  }).catch((err) => {
    next(err);
  });
});

books.delete('/:bookId(\\d+)', (req, res, next) => {
  const { bookId } = req.params;
  Book.findById(bookId, {
    attributes: ['id'],
  }).then((book) => {
    book.destroy();
    res.status(204).end();
  }).catch((err) => {
    next(err);
  });
});

books.delete('/:bookId(\\d+)', (req, res, next) => {
  const { bookId } = req.params;
  Book.findById(bookId, {
    attributes: ['id'],
  }).then((book) => {
    book.destroy();
    res.status(204).end();
  }).catch((err) => {
    next(err);
  });
});

books.get('/:bookId/reviews', (req, res, next) => {
  const { bookId } = req.params;
  BookReview.findAll({
    where: {
      bookId,
    },
    attributes: ['comment', 'createdAt'],
    include: [{
      model: User,
      attributes: ['name'],
    }],
  }).then((comments) => {
    res.json(comments);
  }).catch((err) => {
    next(err);
  });
});

books.post('/:bookId/reviews', (req, res, next) => {
  const { bookId } = req.params;
  const { comment, userId } = req.body;
  BookReview.create({
    comment,
    bookId,
    userId,
  }).then((bookReview) => {
    res.status(201).json(bookReview);
  }).catch((err) => {
    next(err);
  });
});

books.get('/most-reviewed/:limit(\\d+)?', (req, res, next) => {
  const limit = parseInt(req.params.limit || 5, 10);
  Book.findAll({
    include: [{
      model: BookReview,
      attributes: [],
      duplicating: false,
    }],
    attributes: ['id', 'title', [Sequelize.fn('COUNT', Sequelize.col('book_reviews.id')), 'reviews_count']],
    group: ['book.id', 'book.title'],
    order: [
      [Sequelize.fn('COUNT', Sequelize.col('book_reviews.id')), 'DESC'],
    ],
    limit,
  }).then((result) => {
    res.send(result);
  }).catch((err) => {
    next(err);
  });
});

books.get('/by-author/:authorId(\\d+)', (req, res, next) => {
  const { authorId } = req.params;
  Book.findAll({
    include: [{
      model: Author,
      where: {
        id: authorId,
      },
      attributes: [],
    }],
    attributes: ['id', 'title'],
  }).then((result) => {
    res.send(result);
  }).catch((err) => {
    next(err);
  });
});

books.get('/by-rate/:from(\\d+)-:to(\\d+)', (req, res, next) => {
  const { from, to } = req.params;
  Book.findAll({
    include: [{
      model: BookRate,
      attributes: [],
    }],
    attributes: ['id', 'title', [Sequelize.fn('AVG', Sequelize.col('book_rates.rate')), 'avg_rate']],
    group: ['book.id', 'book.title'],
    having: Sequelize.where(Sequelize.fn('AVG', Sequelize.col('book_rates.rate')), {
      $gte: parseInt(from, 10),
      $lte: parseInt(to, 10),
    }),
    order: [
      Sequelize.fn('AVG', Sequelize.col('book_rates.rate')),
    ],
  }).then((result) => {
    res.send(result);
  }).catch((err) => {
    next(err);
  });
});

books.post('/:bookId/rates', (req, res, next) => {
  const { bookId } = req.params;
  const { rate, userId } = req.body;
  BookRate.create({
    rate,
    bookId,
    userId,
  }).then((bookRate) => {
    res.status(201).json(bookRate);
  }).catch((err) => {
    next(err);
  });
});

module.exports = books;
