const Product = require("../model/productModel");
const parseError = require("../services/parseError");
const { error, success } = require("../services/apiResponse");
const { serverError, successRequest } = require("../services/statusCode");
const getProduct = async (req, res) => {
  try {
    const products = await Product.find();
    const results = {
      data: products,
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

module.exports = {
  getProduct,
};
