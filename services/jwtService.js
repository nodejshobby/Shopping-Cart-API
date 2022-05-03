const jwt = require("jsonwebtoken");
const parseError = require("./parseError");

//Generate authentication token
const generateAuthToken = async (user) => {
  try {
    const userId = user._id.toString();
    const authToken = await jwt.sign(
      { id: userId, username: user.username },
      process.env.AUTH_TOKEN_SECRET,
      {
        expiresIn: process.env.AUTH_TOKEN_LIFETIME,
      }
    );
    return authToken;
  } catch (error) {
    parseError(error);
  }
};

//Generate refresh token for authentication refresh mechanism
const generateRefreshToken = async (user) => {
  try {
    const userId = user._id.toString();
    const refreshToken = await jwt.sign(
      { id: userId, username: user.username },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_LIFETIME,
      }
    );
    return refreshToken;
  } catch (error) {
    parseError(error);
  }
};

module.exports = {
  generateAuthToken,
  generateRefreshToken,
};
