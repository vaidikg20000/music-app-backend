const jwt = require("jsonwebtoken");
require('dotenv').config();

function jwtGenerator(data) {
    const payload = {
        key: data
    } 
    const token = jwt.sign(payload, process.env.jwtSecret)
    return token;
}

module.exports = jwtGenerator;