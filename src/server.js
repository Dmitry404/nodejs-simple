const winston = require('winston');
const moment = require('moment');
const http = require('http');
const app = require('./app');

const hostname = 'localhost';
const port = process.env.npm_package_config_server_port || 3000;

http.createServer(app).listen(port, () => {
  winston.info(`Phase 3 app has been started on http://${hostname}:${port} at ${moment().toISOString()}`);
});
