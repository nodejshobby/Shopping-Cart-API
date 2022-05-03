const bcrypt = require("bcrypt");
const parseError = require("./parseError");

//Hash a plain password
const hashPassword = async (plainPassword) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return hashedPassword;
  } catch (error) {
    parseError(error);
  }
};

//Check for correct password againt database hashed password
const checkHash = async (plainPassword, hashedPassword) => {
  try {
    const passwordCheck = await bcrypt.compare(plainPassword, hashedPassword);
    return passwordCheck;
  } catch (error) {
    parseError(error);
  }
};

module.exports = {
  hashPassword,
  checkHash,
};
