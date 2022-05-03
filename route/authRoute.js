const express = require("express");
const router = express.Router();
const {
  userRegistrationValidation,
  userLoginValidation,
} = require("../validation/userValidation");
const userController = require("../controller/authController");
const isVerifyRefreshToken = require("../middleware/verifyRefreshToken");

const isVerifyAuthToken = require("../middleware/verifyAuthToken");
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
 *                        $ref: '#components/schemas/resResultData'
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
 * /auth/register:
 *    post:
 *      summary: Use for signing up new user
 *      tags: [Authentication]
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

router.post("/register", userRegistrationValidation, userController.Register);

/**
 * @swagger
 * /auth/login:
 *    post:
 *      summary: Use for signing in user
 *      tags: [Authentication]
 *      description: Use for signing in user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/User'
 *      responses:
 *        200:
 *          description: A successful user request
 *          content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/userResponse'
 *        422:
 *          description: Validation error occured
 *        500:
 *          description: Something went wrong
 *
 */

router.post("/login", userLoginValidation, userController.Login);

/**
 * @swagger
 * /auth/refresh:
 *    post:
 *      summary: Use for refreshing user jwt token
 *      tags: [Authentication]
 *      description: Use for refreshing user jwt token
 *      requestBody:
 *        required: true
 *        content:
 *            application/json:
 *                 schema:
 *                    type: object
 *                    properties:
 *                        refreshToken:
 *                          type: String
 *
 *      responses:
 *       201:
 *          content:
 *             application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/userResponse'
 *
 *       400:
 *          description: Validation error occured
 *       500:
 *          description: Something went wrong
 */

router.post("/refresh", isVerifyRefreshToken, userController.Refresh);

/**
 * @swagger
 * /auth/logout:
 *    get:
 *      summary: Use for logging-out user
 *      tags: [Authentication]
 *      description: Use for logging-out user
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: A successful response
 *        401:
 *          description: Unauthenticated Request
 *        500:
 *           description: Something went wrong
 *
 */
router.get("/logout", isVerifyAuthToken, userController.Logout);

module.exports = router;
