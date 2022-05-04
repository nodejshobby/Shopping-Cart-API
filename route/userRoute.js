const express = require("express");
const router = express.Router();
const isVerifyAuthToken = require("../middleware/verifyAuthToken");
const userController = require("../controller/userController");
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
 *  name: User
 *  description: Used for User operation
 */

/**
 * @swagger
 * /users:
 *    get:
 *      summary: Use for getting all user cart products
 *      tags: [User]
 *      description: Use for getting all user cart products
 *      security:
 *          - bearerAuth: []
 *      responses:
 *         200:
 *            description: A user details is successfully fetched
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
router.get("/", isVerifyAuthToken, userController.getUserDetails);
module.exports = router;
