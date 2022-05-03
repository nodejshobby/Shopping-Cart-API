const parseError = require("../services/parseError");
const Product = require("../model/productModel");
const { success, error } = require("../services/apiResponse");
const {
  successRequest,
  badRequest,
  serverError,
  notFound,
} = require("../services/statusCode");
const cartRedis = require("../services/cartRedis");

const addItem = async (req, res) => {
  try {
    const userId = req.user.id;

    const { productId } = req.body;
    if (!productId)
      return res
        .status(badRequest.code)
        .json(error(badRequest.message, badRequest.code));
    const foundProduct = await Product.findById(productId);
    if (!foundProduct)
      return res
        .status(notFound.code)
        .json(error(notFound.message, notFound.code));
    const product = await cartRedis.addItem(userId, foundProduct);

    const results = {
      data: {
        productId,
      },
    };
    if (product)
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
const updateItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;
    if (!productId || !quantity || !(typeof quantity === "number")) {
      return res
        .status(badRequest.code)
        .json(error(badRequest.message, badRequest.code));
    }
    const foundProduct = await Product.findById(productId);
    if (!foundProduct)
      return res
        .status(notFound.code)
        .json(error(notFound.message, notFound.code));
    const product = await cartRedis.updateProductQuantity(
      userId,
      productId,
      quantity
    );

    const results = {
      data: {
        productId,
      },
    };
    if (product)
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

const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const products = await cartRedis.getCartProduct(userId);

    const results = {
      data: {
        cartProduct: products,
      },
    };

    return res
      .status(successRequest.code)
      .json(success(successRequest.message, results, successRequest.code));
  } catch (err) {
    parseError(err);
  }
};

const removeItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    if (!id)
      return res
        .status(badRequest.code)
        .json(error(badRequest.message, badRequest.code));

    const resp = await cartRedis.removeItem(userId, id);
    const results = {};
    if (resp)
      return res
        .status(successRequest.code)
        .json(success(successRequest.message, results, successRequest.code));
  } catch (err) {
    parseError(err);
  }
};

const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const products = await cartRedis.deleteCartProduct(userId);

    const results = {};

    return res
      .status(successRequest.code)
      .json(success(successRequest.message, results, successRequest.code));
  } catch (err) {
    parseError(err);
  }
};

module.exports = {
  addItem,
  updateItem,
  getCart,
  removeItem,
  clearCart,
};
