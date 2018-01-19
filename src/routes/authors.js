const express = require('express');
const Sequelize = require('sequelize');
const {
  Author, Book, BookRate,
} = require('../models');

const authors = express.Router();
const Op = Sequelize.Op;

authors.get('/by-book-rate/:from([1-5])-:to([1-5])', (req, res, next) => {
  const { from, to } = req.params;
  Author.findAll({
    include: [{
      model: Book,
      attributes: ['title'],
      include: [{
        model: BookRate,
      }],
    }],
    attributes: ['books->book_rates.rate', [Sequelize.fn('AVG', Sequelize.col('books->book_rates.rate')), 'avg_rate']],
    group: ['title'],
    having: Sequelize.where(Sequelize.fn('AVG', Sequelize.col('books->book_rates.rate')), {
      [Op.between]: [ parseInt(from, 10), parseInt(to, 10)]
    }),
    order: [[
      Sequelize.fn('AVG', Sequelize.col('books->book_rates.rate')),
      'DESC',
    ]],
  }).then((result) => {
    res.send(result);
  }).catch((err) => {
    next(err);
  });
});

module.exports = authors;
