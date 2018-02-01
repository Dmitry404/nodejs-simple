#!/usr/bin/env node
const dbConf = require('../conf/db');
const winston = require('winston');
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const env = process.env.NODE_ENV || 'development';
const conf = {
  docker: {
    image: process.env.npm_package_config_docker_image,
    container: process.env.npm_package_config_docker_container,
    exposeDbPortOn: process.env.npm_package_config_docker_exposePort,
  },
  db: {
    database: dbConf[env].database,
    username: dbConf[env].username,
    password: dbConf[env].password,
  },
};

const secretFileTemplate = path.resolve('conf', 'secret.json.template');
const secretFile = path.resolve('conf', 'secret.json');
fs.copyFileSync(secretFileTemplate, secretFile);

const result = spawnSync('docker', [
  'run',
  '-p', `${conf.docker.exposeDbPortOn}:3306`,
  `--name=${conf.docker.container}`,
  '-e', `MYSQL_DATABASE=${conf.db.database}`,
  '-e', `MYSQL_USER=${conf.db.username}`,
  '-e', `MYSQL_PASSWORD=${conf.db.password}`,
  '-e', 'MYSQL_ROOT_PASSWORD=$eCReT',
  '-d', conf.docker.image,
]);

if (result.status === 0) {
  winston.info(`Installed docker image [${conf.docker.image}] as ${conf.docker.container}`);
  winston.info('Trying to stop it now..');
  spawnSync('docker', [
    'stop', conf.docker.container,
  ]);

  winston.info('You can run the application now with "npm run start:dev or npm run start:prod"');
} else {
  winston.error(`Something weird has happened. Would you be kind to have a look? [${result.stderr.toString()}]`);
}
