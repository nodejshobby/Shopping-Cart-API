const { validationResult } = require("express-validator");
const User = require("../model/userModel");
const { setAuthToken, clearAuthToken } = require("../services/authRedis");

const { validation, error, success } = require("../services/apiResponse");
const {
  successRequest,
  created,
  validationError,
  serverError,
  unAuthenticated,
} = require("../services/statusCode");
const parseError = require("../services/parseError");
const { hashPassword, checkHash } = require("../services/hashPassword");

const {
  generateAuthToken,
  generateRefreshToken,
} = require("../services/jwtService");

const Register = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(validationError.code).json(validation(errors.array()));
  }
  try {
    const { username, password: plainPassword } = req.body;
    const hashedPassword = await hashPassword(plainPassword);

    const user = await User.create({
      username,
      password: hashedPassword,
    });

    const results = { data: { _id: user._id, username: user.username } };
    return res
      .status(created.code)
      .json(success(created.message, results, created.code));
  } catch (error) {
    parseError(error);
    return res
      .status(serverError.code)
      .json(error(serverError.message, serverError.code));
  }
};

const Login = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(validationError.code).json(validation(errors.array()));
  }
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const checkResult = await checkHash(password, user.password);

    if (!checkResult) {
      return res
        .status(401)
        .json(error(unAuthenticated.message, unAuthenticated.code));
    }

    const authToken = await generateAuthToken(user);
    const refreshToken = await generateRefreshToken(user);

    await setAuthToken(user._id, authToken, refreshToken);

    results = {
      data: { authToken, refreshToken },
    };

    return res
      .status(successRequest.code)
      .json(success(successRequest.message, results, successRequest.code));
  } catch (error) {
    parseError(error);
    return res
      .status(serverError.code)
      .json(error(serverError.message, serverError.code));
  }
};

const Refresh = async (req, res) => {
  try {
    const user = req.user;

    const authToken = await generateAuthToken(user);
    const refreshToken = await generateRefreshToken(user);

    await setAuthToken(user._id, authToken, refreshToken);

    results = {
      data: { authToken, refreshToken },
    };

    return res
      .status(successRequest.code)
      .json(success(successRequest.message, results, successRequest.code));
  } catch (error) {
    parseError(error);
    return res
      .status(serverError.code)
      .json(error(serverError.message, serverError.code));
  }
};

const Logout = async (req, res) => {
  const userId = req.user.id;
  try {
    const clearTrue = await clearAuthToken(userId);
    const results = {
      data: {
        userId,
      },
    };
    if (clearTrue)
      return res
        .status(successRequest.code)
        .json(success(successRequest.message, results, successRequest.code));
  } catch (err) {
    parseError(err);
    return res
      .status(serverError.code)
      .json(error(serverError.message, serverError.code));
  }
};
module.exports = {
  Register,
  Login,
  Refresh,
  Logout,
};
