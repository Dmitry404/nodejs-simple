const express = require('express');
const Sequelize = require('sequelize');
const {
  Book, Author, BookRate,
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

module.exports = books;
