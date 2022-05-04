const { body } = require("express-validator");
const User = require("../model/userModel");
const messages = require("../services/messages");

const productValidation = [
  body("name")
    .notEmpty()
    .bail()
    .withMessage(messages.productName.type)
    .isString()
    .bail()
    .withMessage(messages.productName.type),
  body("image")
    .notEmpty()
    .bail()
    .withMessage(messages.productImage.type)
    .isString()
    .bail()
    .withMessage(messages.productImage.type),
  body("price")
    .notEmpty()
    .bail()
    .withMessage(messages.productPrice.type)
    .isNumeric()
    .bail()
    .withMessage(messages.productPrice.type),
];

module.exports = productValidation;
