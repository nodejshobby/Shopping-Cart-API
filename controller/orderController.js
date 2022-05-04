const Order = require("../model/orderModel");
const {
  successRequest,
  badRequest,
  serverError,
  notFound,
} = require("../services/statusCode");
const cartRedis = require("../services/cartRedis");
const parseError = require("../services/parseError");
const { success, error } = require("../services/apiResponse");

const makeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const userCart = await cartRedis.getCartProduct(userId);
    const userCartTotal = await cartRedis.getCartTotal(userId);

    if (userCart.length === 0)
      return res
        .status(notFound.code)
        .json(error(notFound.message, notFound.code));

    if (!userCart) return;

    const insertOrder = await Order({
      userId,
      products: userCart,
      total: userCartTotal,
    }).save();
    await cartRedis.deleteCartProduct(userId);
    const results = {
      data: {
        orderId: insertOrder._id,
      },
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

const getOrder = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id });
    const results = {
      data: {
        orders,
      },
    };
    return res
      .status(successRequest.code)
      .json(success(successRequest.message, results, successRequest.code));
  } catch (error) {
    parseError(err);
    return res
      .status(serverError.code)
      .json(error(serverError.message, serverError.code));
  }
};

const getSingleOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    if (!orderId)
      return res
        .status(badRequest.code)
        .json(error(badequest.message, badRequest.code));
    const order = await Order.findById(orderId);
    if (!order)
      return res
        .status(notFound.code)
        .json(error(notFound.message, notFound.code));
    const results = {
      data: {
        order,
      },
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
  makeOrder,
  getOrder,
  getSingleOrder,
};
