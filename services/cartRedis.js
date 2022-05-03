const client = require("./redisService");
const parseError = require("./parseError");

function getCartKey(userId) {
  return `${process.env.REDIS_CART_KEY}_${userId}`;
}

//Add item to the redis unique cart key
const addItem = async (userId, product) => {
  try {
    const key = getCartKey(userId);
    const cartItems = await getCartProduct(userId);
    const productIndex = cartItems.findIndex((item) => {
      return item.productId === product._id.toString();
    });
    if (productIndex === -1) {
      const newProduct = {
        productId: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: 1,
      };
      await client.rPush(key, JSON.stringify(newProduct));
      return product._id;
    } else {
      const foundProduct = cartItems[productIndex];
      foundProduct.quantity += 1;
      await client.lSet(key, productIndex, JSON.stringify(foundProduct));
      return product._id;
    }
  } catch (error) {
    parseError(error);
  }
};

//Update cart product quantity of a user
const updateProductQuantity = async (userId, productId, quantity) => {
  try {
    const key = getCartKey(userId);
    const cartItems = await getCartProduct(userId);
    const productIndex = cartItems.findIndex((item) => {
      return item.productId === productId;
    });
    if (productIndex !== -1) {
      const foundProduct = cartItems[productIndex];
      foundProduct.quantity = quantity;
      await client.lSet(key, productIndex, JSON.stringify(foundProduct));
      return productId;
    } else {
      return false;
    }
  } catch (error) {
    parseError(error);
  }
};

//Remove an item to the redis unique cart key
const removeItem = async (userId, productId) => {
  try {
    const key = getCartKey(userId);
    const cartItems = await getCartProduct(userId);
    const productIndex = cartItems.findIndex((item) => {
      return item.productId === productId;
    });
    if (productIndex !== -1) {
      const product = JSON.stringify(cartItems[productIndex]);
      await client.lRem(key, 0, product);
      return cartItems;
    } else {
      return false;
    }
  } catch (error) {
    parseError(error);
  }
};

//Get items in the redis unique user cart
const getCartProduct = async (userId) => {
  try {
    const key = getCartKey(userId);
    const cartItems = await client.lRange(key, 0, -1);
    const cart = [];
    for (i = 0; i < cartItems.length; i++) {
      const product = JSON.parse(cartItems[i]);
      cart.push(product);
    }
    return cart;
  } catch (error) {
    parseError(error);
  }
};

//Delete items in the redis unique user cart
const deleteCartProduct = async (userId) => {
  try {
    const key = getCartKey(userId);
    await client.del(key);
    return true;
  } catch (error) {
    parseError(error);
  }
};

const getCartTotal = async (userId) => {
  try {
    const carts = await getCartProduct(userId);
    let total = 0;
    for (i = 0; i < carts.length; i++) {
      total += carts[i].quantity * carts[i].price;
    }
    return total;
  } catch (error) {
    parseError(error);
  }
};
module.exports = {
  addItem,
  updateProductQuantity,
  removeItem,
  getCartProduct,
  deleteCartProduct,
  getCartTotal,
};
