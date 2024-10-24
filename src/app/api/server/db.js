const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Sign-in',
  password: '%M1p0$tSQLx',
  port: 5432,
});

module.exports = pool;
