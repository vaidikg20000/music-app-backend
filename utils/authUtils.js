
const crypto = require("crypto");
require("dotenv").config();

module.exports = function encryptPassword(password) {
  const md5Hasher = crypto.createHmac("md5", process.env.salt);
  const hash = md5Hasher.update(password).digest("hex");
  return hash;
};

