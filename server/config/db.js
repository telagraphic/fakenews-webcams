const postgres = require('pg-promise')({});

// Preparing the connection details: 'postgres://username:password@host:port/database';
const local = {
  host: 'localhost',
  port: 5432,
  database: 'fakenews-webcams-test',
  user: 'telagraphic',
  password: 'P@ssw0rd'
};

const connection = process.env.DATABASE_URL || local;
const database = postgres(connection);

module.exports = database;
