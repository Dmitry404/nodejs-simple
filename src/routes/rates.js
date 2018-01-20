const express = require('express');
const {
  BookRate,
} = require('../models');

const rates = express.Router();

rates.put('/:rateId(\\d+)', (req, res, next) => {
  const { rateId } = req.params;
  const { rate } = req.body;
  BookRate.update(
    { rate },
    { where: { id: rateId } },
  ).then(() => {
    res.status(204).end();
  }).catch((err) => {
    next(err);
  });
});

module.exports = rates;
