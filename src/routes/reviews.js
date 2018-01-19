const express = require('express');
const {
  BookReview, User,
} = require('../models');

const reviews = express.Router({ mergeParams: true });

reviews.get('/', (req, res, next) => {
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

reviews.post('/', (req, res, next) => {
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

module.exports = reviews;
