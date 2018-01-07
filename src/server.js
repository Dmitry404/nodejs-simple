const winston = require('winston');
const moment = require('moment');
const http = require('http');
const app = require('./app');

const hostname = 'localhost';
const port = 3000;

http.createServer(app).listen(port, () => {
  winston.info(`Phase 1 app has been started on http://${hostname}:${port} at ${moment().toISOString()}`);
});
