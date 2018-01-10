const express = require('express');

const authors = express.Router();

authors.get('/', (req, res) => {
  res.send({ test: 'test_authors' });
});

module.exports = authors;
