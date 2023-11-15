require("dotenv").config();
const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.TOKEN);
  return token;
};

const verifyToken = (token) => {
  const decoded = jwt.verify(token, process.env.TOKEN);
  return decoded;
};

module.exports = {
  generateToken,
  verifyToken,
};
