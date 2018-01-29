const express = require('express');
const { User } = require('../models');

const accounts = express.Router();

accounts.get('/sign-in', (req, res, next) => { // eslint-disable-line no-unused-vars
  // login - generate token?
  res.send('login here');
});

accounts.get('/sign-out', (req, res, next) => { // eslint-disable-line no-unused-vars
  // logout - clean token?
});

accounts.post('/sign-up', (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  User.create({
    name, email, password,
  }).then((user) => {
    res.status(201).json(user);
  }).catch((err) => {
    next(err);
  });
});

module.exports = accounts;
