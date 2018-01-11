const express = require('express');
const Sequelize = require('sequelize');
const {
  Book, Author, BookRate, BookReview, User,
} = require('../models');

const books = express.Router();

books.get('/', (req, res) => {
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
  });
});

books.get('/:bookId', (req, res) => {
  const { bookId } = req.params;
  Book.findById(bookId, {
    include: [{
      model: Author,
      attributes: ['name'],
    }],
  }).then((book) => {
    res.json(book);
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

module.exports = books;
