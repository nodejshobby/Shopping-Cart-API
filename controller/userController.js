const parseError = require("../services/parseError");
const User = require("../model/userModel");
const { success } = require("../services/apiResponse");
const { successRequest } = require("../services/statusCode");

const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    results = {
      data: {
        id: user._id,
        username: user.username,
      },
    };
    return res
      .status(successRequest.code)
      .json(success(successRequest.message, results, successRequest.code));
  } catch (error) {
    parseError(error);
  }
};

module.exports = {
  getUserDetails,
};
