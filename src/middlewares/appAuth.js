const winston = require('winston');
const { Strategy, ExtractJwt } = require('passport-jwt');
const conf = require('../../conf/secret.json');
const { User } = require('../models');

const getSecret = () => {
  if (conf.jwtSecret === 'CHANGE_ME') {
    winston.error('You need to set up a secure JWT token in conf/secret.json');
  }
  return conf.jwtSecret;
};

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: getSecret(),
};

const jwtStrategy = new Strategy(opts, (payload, done) => {
  const userId = payload.sub;
  User.findById(userId, {
    attributes: ['id', 'name', 'email'],
  }).then((user) => {
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  }).catch(err => done(err, false));
});

module.exports = {
  jwtStrategy,
};
