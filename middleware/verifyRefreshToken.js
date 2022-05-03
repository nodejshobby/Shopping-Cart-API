const jwt = require("jsonwebtoken");
const { error } = require("../services/apiResponse");
const { badRequest } = require("../services/statusCode");
const parseError = require("../services/parseError");
const { getAuthToken } = require("../services/authRedis");
const { username } = require("../services/messages");
const isVerifyRefreshToken = async (req, res, next) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken)
    return res
      .status(badRequest.code)
      .json(error(badRequest.message, badRequest.code));

  try {
    const user = await jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const authParams = await getAuthToken(user.id);
    if (authParams.refreshToken !== refreshToken) {
      return res
        .status(badRequest.code)
        .json(error(badRequest.message, badRequest.code));
    }
    const { id, username } = user;
    req.user = { _id: id, username };
    next();
  } catch (err) {
    parseError(err);
    return res
      .status(badRequest.code)
      .json(error(badRequest.message, badRequest.code));
  }
};

module.exports = isVerifyRefreshToken;
