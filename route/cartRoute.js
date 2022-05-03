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
 *                properties:
 *                    data:
 *                      schema:
 *                        $ref: '#/resResultData'
 *
 *       User:
 *          type: Object
 *          required:
 *            - username
 *            - password
 *          properties:
 *            username:
 *                type: String
 *                description: User's username
 *            password:
 *                type: String
 *                description: User's password
 *          example:
 *              username: kolade246
 *              password: kolawole
 *
 *       resResultData:
 *          type: Object
 *          required: true
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
 *  name: Authentication
 *  description: Used for authenticating user
 */
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
 *                properties:
 *                    data:
 *                      schema:
 *                        $ref: '#/resResultData'
 *
 *       User:
 *          type: Object
 *          required:
 *            - username
 *            - password
 *          properties:
 *            username:
 *                type: String
 *                description: User's username
 *            password:
 *                type: String
 *                description: User's password
 *          example:
 *              username: kolade246
 *              password: kolawole
 *
 *       resResultData:
 *          type: Object
 *          required: true
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
 *  name: Authentication
 *  description: Used for authenticating user
 */
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
 *                properties:
 *                    data:
 *                      schema:
 *                        $ref: '#/resResultData'
 *
 *       User:
 *          type: Object
 *          required:
 *            - username
 *            - password
 *          properties:
 *            username:
 *                type: String
 *                description: User's username
 *            password:
 *                type: String
 *                description: User's password
 *          example:
 *              username: kolade246
 *              password: kolawole
 *
 *       resResultData:
 *          type: Object
 *          required: true
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
 *  name: Authentication
 *  description: Used for authenticating user
 */
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
 *                properties:
 *                    data:
 *                      schema:
 *                        $ref: '#/resResultData'
 *
 *       User:
 *          type: Object
 *          required:
 *            - username
 *            - password
 *          properties:
 *            username:
 *                type: String
 *                description: User's username
 *            password:
 *                type: String
 *                description: User's password
 *          example:
 *              username: kolade246
 *              password: kolawole
 *
 *       resResultData:
 *          type: Object
 *          required: true
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
 *  name: Authentication
 *  description: Used for authenticating user
 */
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
 *                properties:
 *                    data:
 *                      schema:
 *                        $ref: '#/resResultData'
 *
 *       User:
 *          type: Object
 *          required:
 *            - username
 *            - password
 *          properties:
 *            username:
 *                type: String
 *                description: User's username
 *            password:
 *                type: String
 *                description: User's password
 *          example:
 *              username: kolade246
 *              password: kolawole
 *
 *       resResultData:
 *          type: Object
 *          required: true
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
 *  name: Authentication
 *  description: Used for authenticating user
 */
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
 *                properties:
 *                    data:
 *                      schema:
 *                        $ref: '#/resResultData'
 *
 *       User:
 *          type: Object
 *          required:
 *            - username
 *            - password
 *          properties:
 *            username:
 *                type: String
 *                description: User's username
 *            password:
 *                type: String
 *                description: User's password
 *          example:
 *              username: kolade246
 *              password: kolawole
 *
 *       resResultData:
 *          type: Object
 *          required: true
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *        bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 * secutiy:
 *      - bearerAuth: []
 * tags:
 *  name: Cart
 *  description: For adding item to cart only authenticated user
 */

/**
 * @swagger
 * /auth/cart:
 *    post:
 *      summary: Use for signing up new user
 *      tags: [Cart]
 *      description: Use for signing up new user
 *      requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/User'
 *      responses:
 *         201:
 *            description: A successful user creation
 *            content:
 *              application/json:
 *                 schema:
 *                   $ref: '#/components/schemas/userResponse'
 *         422:
 *           description: Validation error occured
 *         500:
 *           description: Something went wrong
 */

router.post("/", isVerifyAuthToken, cartController.addItem);
router.get("/", isVerifyAuthToken, cartController.getCart);
router.put("/", isVerifyAuthToken, cartController.updateItem);
router.delete("/:id", isVerifyAuthToken, cartController.removeItem);
router.delete("/", isVerifyAuthToken, cartController.clearCart);

module.exports = router;
