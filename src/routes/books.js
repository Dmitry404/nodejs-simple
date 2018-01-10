const express = require('express');

const books = express.Router();

books.get('/', (req, res) => {
  res.send({ test: 'test_books' });
});

module.exports = books;
