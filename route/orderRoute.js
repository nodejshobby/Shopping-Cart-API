const express = require("express");
const router = express.Router();
const isVerifyAuthToken = require("../middleware/verifyAuthToken");
const orderController = require("../controller/orderController");
/**
 * @swagger
 * components:
 *   schemas:
 *       userResponse:
 *         type: Object
 *         required:
 *            - message
 *            - error
 *            - code
 *         properties:
 *            message:
 *                type: String
 *                description: Message of the response
 *            error:
 *                type: Boolean
 *                description: Indicate maybe response has error
 *            code:
 *                type: Integer
 *                description: Used to define the status code of a response
 *            results:
 *                type: Object
 *                description: Results of the response
 *                schema:
 *                    data:
 *                      type: Object
 *                      required: true
 *
 *
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *        bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 * tags:
 *  name: Order
 *  description: Used for Order operation
 */
/**
 * @swagger
 * /orders:
 *    post:
 *      summary: Use for making order from user cart
 *      tags: [Order]
 *      description: Use for making order from user cart
 *      security:
 *          - bearerAuth: []
 *      responses:
 *         200:
 *            description: An order was  successfully made
 *            content:
 *              application/json:
 *                 schema:
 *                   $ref: '#/components/schemas/userResponse'
 *         400:
 *           description: Bad Request
 *         404:
 *           description: Not Found
 *         401:
 *           description: Unauthenticated request
 *         500:
 *           description: Something went wrong
 */
router.post("/", isVerifyAuthToken, orderController.makeOrder);
/**
 * @swagger
 * /orders:
 *    get:
 *      summary: Use for getting all user orders
 *      tags: [Order]
 *      description: Use for getting all user orders
 *      security:
 *          - bearerAuth: []
 *      responses:
 *         200:
 *            description: Orders fetched successfully
 *            content:
 *              application/json:
 *                 schema:
 *                   $ref: '#/components/schemas/userResponse'
 *         400:
 *           description: Bad Request
 *         404:
 *           description: Not Found
 *         401:
 *           description: Unauthenticated Request
 *         500:
 *           description: Something went wrong
 */
router.get("/", isVerifyAuthToken, orderController.getOrder);
/**
 * @swagger
 * /orders/{orderId}:
 *    get:
 *      summary: Use for getting specific order
 *      tags: [Order]
 *      description: Use for getting specific order
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: orderId
 *            required: true
 *            description: An order id to be fetched
 *            example:
 *                626bba2591c7052c659e29c4
 *      responses:
 *         200:
 *            description: An Order was fetched successfully
 *            content:
 *              application/json:
 *                 schema:
 *                   $ref: '#/components/schemas/userResponse'
 *         400:
 *           description: Bad Request
 *         404:
 *           description: Not Found
 *         401:
 *           description: Unauthenticated Request
 *         500:
 *           description: Something went wrong
 */
router.get("/:orderId", isVerifyAuthToken, orderController.getSingleOrder);

module.exports = router;
