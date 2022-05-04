const express = require("express");
const router = express.Router();

const productController = require("../controller/productController");
const isVerifyAuthToken = require("../middleware/verifyAuthToken");
const productValidation = require("../validation/productValidation");
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
 *       Product:
 *          type: Object
 *          required:
 *            - name
 *            - price
 *            - image
 *          properties:
 *            name:
 *                type: String
 *                description: Name of the product
 *            image:
 *                type: String
 *                description: Url of the product image
 *            price:
 *                type: Number
 *                description: Price of the product
 *          example:
 *                name: Shoe Blazer
 *                image: http://localhost:3000/
 *                price: 4000
 */

/**
 * @swagger
 * tags:
 *  name: Product
 *  description: Used for Product operation
 */

/**
 * @swagger
 * /products:
 *    get:
 *      summary: Use for getting all products avalaible
 *      tags: [Product]
 *      description: Use for getting all products avalaible
 *      responses:
 *         200:
 *            description: All products was fetched
 *            content:
 *              application/json:
 *                 schema:
 *                   $ref: '#/components/schemas/userResponse'
 *         500:
 *           description: Something went wrong
 */
router.get("/", productController.getProduct);
/**
 * @swagger
 * /products:
 *    post:
 *      summary: Use for adding product to the database all products
 *      tags: [Product]
 *      description: Use for adding product to the database all products
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Product'
 *      security:
 *         - bearerAuth: []
 *      responses:
 *         200:
 *            description: A product was successfully addded
 *            content:
 *              application/json:
 *                 schema:
 *                   $ref: '#/components/schemas/userResponse'
 *         422:
 *            description: Validation Errors
 *         400:
 *            description: Bad Reaquest
 *         401:
 *            description: Not authenticated
 *         500:
 *           description: Something went wrong
 */
router.post(
  "/",
  isVerifyAuthToken,
  productValidation,
  productController.addProduct
);

module.exports = router;
