const express = require('express');
const Sequelize = require('sequelize');
const {
  Book, Author, BookRate, BookReview,
} = require('../models');

const books = express.Router();
const { Op } = Sequelize;

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

books.get('/by-rate/:from([1-5])-:to([1-5])', (req, res, next) => {
  const { from, to } = req.params;
  Book.findAll({
    include: [{
      model: BookRate,
      attributes: [],
    }],
    attributes: ['id', 'title', [Sequelize.fn('AVG', Sequelize.col('book_rates.rate')), 'avg_rate']],
    group: ['book.id', 'book.title'],
    having: Sequelize.where(Sequelize.fn('AVG', Sequelize.col('book_rates.rate')), {
      [Op.between]: [parseInt(from, 10), parseInt(to, 10)],
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

module.exports = books;
