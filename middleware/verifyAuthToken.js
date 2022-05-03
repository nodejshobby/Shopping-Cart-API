const jwt = require("jsonwebtoken");
const { error } = require("../services/apiResponse");
const { unAuthenticated, badRequest } = require("../services/statusCode");
const parseError = require("../services/parseError");
const { getAuthToken } = require("../services/authRedis");
const isVerifyAuthToken = async (req, res, next) => {
  const authTokenArray = req.headers["authorization"]
    ? req.headers["authorization"].split(" ")
    : [];
  const authToken = authTokenArray[1];
  if (!authToken)
    return res
      .status(badRequest.code)
      .json(error(badRequest.message, badRequest.code));

  try {
    const user = await jwt.verify(authToken, process.env.AUTH_TOKEN_SECRET);
    const authParams = await getAuthToken(user.id);

    if (authParams.authToken !== authToken) {
      return res
        .status(unAuthenticated.code)
        .json(error(unAuthenticated.message, unAuthenticated.code));
    }
    req.user = user;
    next();
  } catch (err) {
    parseError(err);
    return res
      .status(unAuthenticated.code)
      .json(error(unAuthenticated.message, unAuthenticated.code));
  }
};

module.exports = isVerifyAuthToken;
