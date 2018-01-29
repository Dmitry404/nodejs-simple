const winston = require('winston');
const pathToRegexp = require('path-to-regexp');
const { Strategy, ExtractJwt } = require('passport-jwt');
const jwt = require('jsonwebtoken');
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

function isAnonymousAllowed(user) {
  return user === 'anonymous';
}

function getRolePermissions(user) {
  const { roleId } = user.dataValues;
  return RolePermission.findAll({
    attributes: ['route', 'method'],
    where: {
      roleId,
    },
  });
}

const authorizeUser = () => {
  const authorize = (req, res, next) => {
    if (req.user && isAnonymousAllowed(req.user)) {
      next();
    } else if (req.user) {
      getRolePermissions(req.user)
        .then((permissions) => {
          if (verifyRouteMatch(req.path, req.method, permissions)) {
            next();
          } else {
            res.status(401).send('Unauthorized');
          }
        })
        .catch((err) => {
          winston.error(err);
          res.status(401).send('Unauthorized');
        });
    } else {
      res.status(401).send('Unauthenticated');
    }
  };
  return authorize;
};

const generateToken = payload => jwt.sign(payload, getSecret());

module.exports = {
  jwtStrategy, authorizeUser, generateToken,
};
