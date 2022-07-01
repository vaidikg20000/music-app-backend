const Pool = require('pg').Pool;
require('dotenv').config();


const pool = new Pool({
    user: process.env.postgresUser,
    password: process.env.postgresPassword,
    host: process.env.postgresHost,
    port: 5432,
    database: process.env.postgresName
  });
  
module.exports = pool;