const pg = require('pg');
const client = new pg.Client({
    host: 'horton.elephantsql.com',
    port: 5432,
    database: 'jfdbfjaj',
    user: 'jfdbfjaj',
    password: '8f9ntQwZaSzJPIQQcn0bbXxI0t0N2JeP'
  });
client.connect();

module.exports = client;
