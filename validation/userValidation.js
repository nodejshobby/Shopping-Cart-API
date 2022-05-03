const { body } = require("express-validator");
const User = require("../model/userModel");
const messages = require("../services/messages");

//RegExp ^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$
const userRegistrationValidation = [
  body("username")
    .trim()
    .notEmpty()
    .bail()
    .withMessage(messages.username.type)
    .isLength({ min: 5, max: 20 })
    .bail()
    .withMessage(messages.username.length)
    .matches(/^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/)
    .bail()
    .withMessage(messages.username.type)
    .custom((value) => {
      return User.findOne({ username: value }).then((user) => {
        if (user) {
          return Promise.reject(messages.username.unique);
        }
      });
    }),

  body("password")
    .trim()
    .notEmpty()
    .bail()
    .withMessage(messages.password.type)
    .isLength({
      min: 6,
    })
    .bail()
    .withMessage(messages.password.length),
];

const userLoginValidation = [
  body("username")
    .trim()
    .notEmpty()
    .bail()
    .withMessage(messages.username.type)
    .isLength({ min: 5, max: 20 })
    .bail()
    .withMessage(messages.username.length)
    .matches(/^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/)
    .bail()
    .withMessage(messages.username.type)
    .custom((value) => {
      return User.findOne({ username: value }).then((user) => {
        if (!user) {
          return Promise.reject(messages.username.nonExist);
        }
      });
    }),
  body("password")
    .notEmpty()
    .bail()
    .withMessage(messages.password.type)
    .isLength({
      min: 6,
    })
    .bail()
    .withMessage(messages.password.length),
];

module.exports = {
  userRegistrationValidation,
  userLoginValidation,
};
