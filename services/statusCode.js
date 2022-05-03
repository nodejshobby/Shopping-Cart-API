// List of status codes and their generic messages
const statusCode = {
  successRequest: {
    code: 200,
    message: "Ok",
  },
  created: {
    code: 201,
    message: "Created",
  },

  badRequest: {
    code: 400,
    message: "Invalid request",
  },
  unAuthenticated: {
    code: 401,
    message: "Not authenticated",
  },
  forbiddenRequest: {
    code: 403,
    message: "Forbidden request",
  },
  notFound: {
    code: 404,
    message: "Not found",
  },
  validationError: { code: 422, message: "Validation errors" },
  serverError: {
    code: 500,
    message: "Something went wrong",
  },
};

module.exports = statusCode;
