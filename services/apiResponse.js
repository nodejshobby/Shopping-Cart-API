const { validationError } = require("./statusCode");

/**
 * @desc    Send any success response
 *
 * @param  {string} messsage
 * @param  {object| array} results
 * @param  {number}  statusCode
 */

success = (message, results, statusCode) => {
  return {
    message,
    error: false,
    code: statusCode,
    results,
  };
};

/**
 * @desc    Send any error response
 *
 * @param  {string} messsage
 * @param  {number}  statusCode
 */

error = (message, statusCode) => {
  return {
    message,
    code: statusCode,
    error: true,
  };
};

/**
 * @desc    Send any validation response
 *
 * @param  {object | array} errors
 */

validation = (errors) => {
  return {
    message: validationError.message,
    error: true,
    code: validationError.code,
    errors,
  };
};

module.exports = {
  validation,
  error,
  success,
};
