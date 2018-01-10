const path = require('path');
const winston = require('winston');

module.exports = {
  pageNotFound: (req, res) => {
    res.status(404).sendFile(path.resolve(__dirname, '..', 'public', '404.png'));
  },
  serverError: (err, req, res) => {
    winston.error(err);
    const statusCode = err.code || 500;
    const env = process.env.NODE_ENV || 'development';
    if (env === 'development') {
      res.status(statusCode).send(err.stack);
    } else {
      res.status(statusCode).end();
    }
  },
};
