const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, 
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false, 
});

pool.connect()
  .then(client => {
    console.log('Connected to PostgreSQL successfully!');
    client.release(); 
  })
  .catch(err => {
    console.error('Error connecting to PostgreSQL:', err.stack);
    process.exit(1); 
  });

module.exports = pool;
