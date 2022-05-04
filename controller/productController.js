const Product = require("../model/productModel");
const parseError = require("../services/parseError");
const { error, success } = require("../services/apiResponse");
const {
  validationError,
  serverError,
  successRequest,
} = require("../services/statusCode");
const { validationResult } = require("express-validator");
const getProduct = async (req, res) => {
  try {
    const products = await Product.find();
    const results = {
      data: products,
    };
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

const addProduct = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(validationError.code).json(validation(errors.array()));
  }
  try {
    const { name, image, price } = req.body;
    const product = await Product.create({ name, image, price });
    const results = {
      data: product,
    };
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
  getProduct,
  addProduct,
};
