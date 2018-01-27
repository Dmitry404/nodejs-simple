const winston = require('winston');
const pathToRegexp = require('path-to-regexp');
const { Strategy, ExtractJwt } = require('passport-jwt');
const conf = require('../../conf/secret.json');
const { User, RolePermission } = require('../models');

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
    attributes: ['id', 'name', 'email', 'roleId'],
  }).then((user) => {
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  }).catch(err => done(err, false));
});

function matches(currentMethod, methodToMatch, currentRoute, routeToMatch) {
  return (methodToMatch === '*' || methodToMatch === currentMethod) && pathToRegexp(routeToMatch).test(currentRoute);
}

function verifyRouteMatch(currentRoute, currentMethod, rolePermissions) {
  let matched = false;
  Object.values(rolePermissions).forEach((permissions) => {
    const { route, method } = permissions;
    if (matches(currentMethod.toLowerCase(), method.toLowerCase(), currentRoute, route)) {
      matched = true;
    }
  });
  return matched;
}

const authorizeUser = () => {
  const authorize = (req, res, next) => {
    if (req.user) {
      const { roleId } = req.user.dataValues;
      RolePermission.findAll({
        attributes: ['route', 'method'],
        where: {
          roleId,
        },
      }).then((permissions) => {
        if (verifyRouteMatch(req.path, req.method, permissions)) {
          next();
        } else {
          res.status(401).send('Unauthorized');
        }
      });
    } else {
      next(new Error('Unauthenticated'));
    }
  };
  return authorize;
};

module.exports = {
  jwtStrategy, authorizeUser,
};
