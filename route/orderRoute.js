const express = require("express");
const router = express.Router();
const isVerifyAuthToken = require("../middleware/verifyAuthToken");
const orderController = require("../controller/orderController");

router.post("/", isVerifyAuthToken, orderController.makeOrder);
router.get("/", isVerifyAuthToken, orderController.getOrder);
router.get("/:orderId", isVerifyAuthToken, orderController.getSingleOrder);

module.exports = router;
