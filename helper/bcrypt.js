const bcrypt = require("bcrypt");

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
};

const comparePassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

module.exports = {
  hashPassword,
  comparePassword,
};
