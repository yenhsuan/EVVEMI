const pg = require('pg');
const client = new pg.Client({
    host: '127.0.0.1',
    port: 5432,
    database: 'evvemi',
    user: 'postgres',
    password: ''
  });
client.connect();

module.exports = client;
