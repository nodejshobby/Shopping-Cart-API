const redis = require("redis");
const parseError = require("./parseError");

const client = redis.createClient({ url: process.env.REDIS_URI });

//Make a connection to redis database
(async () => {
  try {
    await client.connect();
    console.log("Redis server connected to sucessfully");
  } catch (error) {
    parseError(error);
  }
})();

module.exports = client;
