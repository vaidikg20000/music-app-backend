const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "vaidikvaidik",
    host: "localhost",
    port: 5432,
    database: "musicapp"
  });
  
module.exports = pool;