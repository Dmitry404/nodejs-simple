#!/usr/bin/env node
const winston = require('winston');
const db = require('../conf/db').test;
const mysql = require('mysql2/promise');

const dbConf = {
  host: db.host,
  port: db.port,
  user: db.username,
  password: db.password,
};

async function reCreateTestDb() {
  winston.info(`Going to re-create test database [${db.database}]`);

  try {
    const connection = await mysql.createConnection(dbConf);
    await connection.query(`DROP DATABASE IF EXISTS ${db.database}`);
    const [resultSetHeader] = await connection.query(`CREATE DATABASE ${db.database}`);
    if (resultSetHeader.affectedRows === 1) {
      winston.info(`${db.database} has been re-created`);
      process.exit(0);
    }
  } catch (e) {
    winston.error(e);
    process.exit(-1);
  }
}

reCreateTestDb();
