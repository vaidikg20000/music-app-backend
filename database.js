const Pool = require('pg').Pool;
require('dotenv').config();


const pool = new Pool({
    user: "postgres",
    password: process.env.postgresPassword,
    host: "localhost",
    port: 5432,
    database: "musicapp"
  });
  
module.exports = pool;