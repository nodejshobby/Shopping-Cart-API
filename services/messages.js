// Validation messages
const messages = {
  username: {
    type: "Enter a valid username",
    length: "Enter a username of five minimum and twenty maximum characters",
    unique: "Enter another username",
    nonExist: "Enter a valid username",
  },
  password: {
    type: "Enter a valid password",
    length: "Enter a password of six minimum characters",
    match: "Enter matched passwords",
  },
  productName: {
    type: "Enter valid product name",
  },
  productImage: {
    type: "Enter valid product image link",
  },
  productPrice: {
    type: "Enter valid product price",
  },
};

module.exports = messages;
