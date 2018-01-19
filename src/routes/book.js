const express = require('express');
const {
  Book, BookRate,
} = require('../models');

const book = express.Router({ mergeParams: true });

book.put('/:bookId(\\d+)', (req, res, next) => {
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
      }).then((result) => {
        result.setAuthors([]);
        result.addAuthors(authors);
      });
    }
    res.status(204).end();
  }).catch((err) => {
    next(err);
  });
});

book.delete('/:bookId(\\d+)', (req, res, next) => {
  const { bookId } = req.params;
  Book.findById(bookId, {
    attributes: ['id'],
  }).then((result) => {
    result.destroy();
    res.status(204).end();
  }).catch((err) => {
    next(err);
  });
});

book.post('/:bookId(\\d+)/rates', (req, res, next) => {
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

module.exports = book;
