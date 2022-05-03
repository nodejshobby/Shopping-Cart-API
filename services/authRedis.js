const client = require("./redisService");
const parseError = require("./parseError");

function getAuthKey(userId) {
  return `${process.env.REDIS_TOKEN_KEY}_${userId}`;
}

//Set both authToken and refreshToken for validation on authentication middleware
const setAuthToken = async (userId, authToken, refreshToken) => {
  try {
    const key = getAuthKey(userId);
    await client.set(key, JSON.stringify({ authToken, refreshToken }));
  } catch (error) {
    parseError(error);
  }
};

//Get auth token of a user in redis
const getAuthToken = async (userId) => {
  try {
    const key = getAuthKey(userId);
    const res = await client.get(key);
    if (res) {
      return JSON.parse(res);
    }
    return {};
  } catch (error) {
    parseError(error);
  }
};

//Get invalid key in redis
const clearAuthToken = async (userId) => {
  try {
    const key = getAuthKey(userId);
    const res = await client.del(key);
    if (res) return true;
  } catch (error) {
    parseError(error);
  }
};
module.exports = {
  setAuthToken,
  getAuthToken,
  clearAuthToken,
};
