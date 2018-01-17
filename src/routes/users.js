const express = require('express');
const {
  User,
} = require('../models');

const users = express.Router();

users.get('/', (req, res, next) => {
  User.findAll({
    attributes: ['id', 'name', 'email'],
  }).then((result) => {
    res.json(result);
  }).catch((err) => {
    next(err);
  });
});

users.post('/', (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  const { avatar } = req.uploaded;

  User.create({
    name, email, password, avatar,
  }).then((user) => {
    res.status(201).json(user);
  }).catch((err) => {
    next(err);
  });
});

users.put('/:userId(\\d+)', (req, res, next) => {
  const { userId } = req.params;
  const { name } = req.body;

  User.update({
    name,
  }, {
    where: { id: userId },
  }).then(() => {
    res.status(204).end();
  }).catch((err) => {
    next(err);
  });
});

users.delete('/:userId(\\d+)', (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId, {
    attributes: ['id'],
  }).then((user) => {
    if (user) {
      user.destroy();
      res.status(204).end();
    } else {
      next(new Error('No user found'));
    }
  }).catch((err) => {
    next(err);
  });
});

module.exports = users;
