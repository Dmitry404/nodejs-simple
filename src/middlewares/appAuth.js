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

function isAnonymousAllowed(user) {
  return user === 'anonymous';
}

function isUserAuthorized(user, currentPath, currentMethod) {
  const { roleId } = user.dataValues;
  RolePermission.findAll({
    attributes: ['route', 'method'],
    where: {
      roleId,
    },
  }).then(permissions => verifyRouteMatch(currentPath, currentMethod, permissions))
    .catch((err) => {
      winston.error(err);
    });
  return false;
}

const authorizeUser = () => {
  const authorize = (req, res, next) => {
    if (req.user) {
      if (isAnonymousAllowed(req.user) || isUserAuthorized(req.user, req.path, req.method)) {
        next();
      } else {
        res.status(401).send('Unauthorized');
      }
    } else {
      res.status(401).send('Unauthenticated');
    }
  };
  return authorize;
};

module.exports = {
  jwtStrategy, authorizeUser,
};
