const express = require("express");
const router = express.Router();
const isVerifyAuthToken = require("../middleware/verifyAuthToken");
const userController = require("../controller/userController");

router.get("/", isVerifyAuthToken, userController.getUserDetails);
module.exports = router;
