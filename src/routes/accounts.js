const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const { appAuth } = require('../middlewares');

const accounts = express.Router();

accounts.post('/sign-in', (req, res, next) => { // eslint-disable-line no-unused-vars
  const { email, password } = req.body;
  User.findOne({
    attributes: ['id', 'password'],
    where: { email },
  }).then((user) => {
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        const payload = {
          sub: user.id,
        };
        res.status(200).send(appAuth.generateToken(payload));
      } else {
        res.status(200).send('Incorrect password');
      }
    } else {
      res.status(200).send('No such user');
    }
  }).catch((err) => {
    next(err);
  });
});

accounts.get('/sign-out', (req, res, next) => { // eslint-disable-line no-unused-vars
  // logout is not implemented by design yet :)
});

accounts.post('/sign-up', (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  User.create({
    name, email, password: bcrypt.hashSync(password, 10), roleId: 1,
  }).then((user) => {
    res.status(201).json(user);
  }).catch((err) => {
    next(err);
  });
});

module.exports = accounts;
