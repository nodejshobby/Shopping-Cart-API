const mongoose = require("mongoose");
const parseError = require("../services/parseError");

async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected to sucessfully");
  } catch (error) {
    parseError(error);
  }
}

module.exports = connect();
