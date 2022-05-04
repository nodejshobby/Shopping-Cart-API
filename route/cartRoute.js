const express = require("express");
const router = express.Router();
const isVerifyAuthToken = require("../middleware/verifyAuthToken");
const cartController = require("../controller/cartController");

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
 *  name: Cart
 *  description: Used for Cart operation
 */

/**
 * @swagger
 * /carts:
 *    post:
 *      summary: Use for adding product to cart
 *      tags: [Cart]
 *      description: Use for adding product to cart
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                  schema:
 *                      type: Object
 *                      properties:
 *                         productId:
 *                           type: String
 *                           required: true
 *                      example:
 *                           productId: 626bba2591c7052c659e29c4
 *
 *      responses:
 *         200:
 *            description: A  product successfully added to cart
 *            content:
 *              application/json:
 *                 schema:
 *                   $ref: '#/components/schemas/userResponse'
 *         400:
 *           description: Bad Request
 *         401:
 *           description: Unauthenticated request
 *         500:
 *           description: Something went wrong
 */

router.post("/", isVerifyAuthToken, cartController.addItem);
/**
 * @swagger
 * /carts:
 *    get:
 *      summary: Use for getting all user cart products
 *      tags: [Cart]
 *      description: Use for getting all user cart products
 *      security:
 *          - bearerAuth: []
 *      responses:
 *         200:
 *            description: A user cart fetched
 *            content:
 *              application/json:
 *                 schema:
 *                   $ref: '#/components/schemas/userResponse'
 *         400:
 *           description: Bad Request
 *         401:
 *           description: Unauthenticated Request
 *         500:
 *           description: Something went wrong
 */
router.get("/", isVerifyAuthToken, cartController.getCart);
/**
 * @swagger
 * /carts:
 *    put:
 *      summary: Use for quantity of specific product in user cart
 *      tags: [Cart]
 *      description: Use for getting all user cart products
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *               schema:
 *                  type: Object
 *                  required:
 *                      - productId
 *                      - quantity
 *                  properties:
 *                      productId:
 *                          type:  String
 *                      quantity:
 *                          type: Number
 *                  example:
 *                      productId: 626bba2591c7052c659e29c4
 *                      quantity: 20
 *      responses:
 *         200:
 *            description: A product updated
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
router.put("/", isVerifyAuthToken, cartController.updateItem);
/**
 * @swagger
 *  /carts/{id}:
 *    delete:
 *      summary: Use for deleting specific product from user cart products
 *      tags: [Cart]
 *      description: Use for deleting specific product from products
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            requred: true
 *            description: A productid(ObjectId) to be rem0ved
 *      responses:
 *         200:
 *            description: A user cart is trashed
 *            content:
 *              application/json:
 *                 schema:
 *                   $ref: '#/components/schemas/userResponse'
 *         400:
 *           description: Bad Request
 *         401:
 *           description: Unauthenticated Request
 *         500:
 *           description: Something went wrong
 */
router.delete("/:id", isVerifyAuthToken, cartController.removeItem);

/**
 * @swagger
 *  /carts:
 *    delete:
 *      summary: Use for deleting all user cart products
 *      tags: [Cart]
 *      description: Use for deleting all user cart products
 *      security:
 *          - bearerAuth: []
 *      responses:
 *         200:
 *            description: A user cart is trashed
 *            content:
 *              application/json:
 *                 schema:
 *                   $ref: '#/components/schemas/userResponse'
 *         400:
 *           description: Bad Request
 *         404:
 *            description: Not Found
 *         401:
 *           description: Unauthenticated Request
 *         500:
 *           description: Something went wrong
 */
router.delete("/", isVerifyAuthToken, cartController.clearCart);

module.exports = router;
