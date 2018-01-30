const passport = require('passport-strategy');

class AnonymousStrategy extends passport.Strategy {
  constructor(publicRoutes) {
    super();
    this.publicRoutes = publicRoutes || {};
    this.name = 'anonymous';
  }

  authenticate(req, options) { // eslint-disable-line no-unused-vars
    if (this.matches(req.path, req.method)) {
      this.success('anonymous');
    } else {
      this.pass();
    }
  }

  matches(currentPath, currentMethod) {
    return Object.keys(this.publicRoutes).find((route) => {
      const methodToMatch = this.publicRoutes[route].toLowerCase();
      return route === currentPath && methodToMatch === currentMethod.toLowerCase();
    });
  }
}

module.exports = AnonymousStrategy;
