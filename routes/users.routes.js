const usersController = require("../controller/users.controller");
const resetController = require("../controller/reset.controller.js")
const checkUser = require("../tools/checkUserToken.js")

var express = require("express");

var router = express.Router();

router.get("/getBlabbers", checkUser, usersController.getBlabbers);
/**
 * @swagger
 * /users/getBlabbers:
 *   get:
 *      description: get Blabbers
 *      tags:
 *          - users
 *      parameters:
 *          none
 *      responses:
 *          '200':
 *              description: Resource accessed successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

router.post("/ignore", checkUser, usersController.ignore);
/**
 * @swagger
 * /users/ignore:
 *   post:
 *      description: ignore a user
 *      tags:
 *          - users
 *      parameters:
 *          - in: body
 *            name: Ignore Blabber
 *            description: Ignore Blabber
 *            schema:
 *              type: object
 *              required:
 *                 - blabberUsername
 *              properties:
 *                  blabberUsername:
 *                      type: string
 *                      example: blabName
 *      responses:
 *          '200':
 *              description: Database changed successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

router.post("/listen", checkUser, usersController.listen);
/**
 * @swagger
 * /users/listen:
 *   post:
 *      description: listen to a user
 *      tags:
 *          - users
 *      parameters:
 *          - in: body
 *            name: Listen to Blabber
 *            description: Listen to Blabber
 *            schema:
 *              type: object
 *              required:
 *                 - blabberUsername
 *              properties:
 *                  blabberUsername:
 *                      type: string
 *                      example: blabName
 *      responses:
 *          '200':
 *              description: Database changed successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

router.get("/getProfileInfo", checkUser, usersController.getProfileInfo);
/**
 * @swagger
 * /users/getProfileInfo:
 *   get:
 *      description: Get a User's information
 *      tags:
 *          - users
 *      parameters:
 *          None
 *      responses:
 *          '200':
 *              description: Information Retrieved
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

router.get("/getEvents", checkUser, usersController.getEvents);
/**
 * @swagger
 * /users/getEvents:
 *   get:
 *      description: Get a User's event history
 *      tags:
 *          - users
 *      parameters:
 *          None
 *      responses:
 *          '200':
 *              description: Information Retrieved
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

router.post("/updateProfile", checkUser, usersController.updateProfile);
/**
 * @swagger
 * /users/updateProfile:
 *   post:
 *      description: Update a user's profile info
 *      tags:
 *          - users
 *      parameters:
  *          - in: body
 *            name: Update Profile
 *            description: Update Profile
 *            schema:
 *              type: object
 *              required:
 *                 - username
 *                 - blabName
 *                 - realName
 *              properties:
 *                  username:
 *                      type: string
 *                      example: myUsername
 *                  blabName:
 *                      type: string
 *                      example: myBlabName
 *                  realName:
 *                      type: string
 *                      example: myRealName
 *      responses:
 *          '200':
 *              description: Database changed successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

router.post("/register", usersController.register);
/**
  * @swagger
  * /users/register:
  *   post:
  *      description: Register user
  *      tags:
  *          - users
  *      parameters:
  *          - in: body
 *            name: User Register
 *            description: User Register
 *            schema:
 *              type: object
 *              required:
 *                 - username
 *                 - pasword
 *              properties:
 *                  username:
 *                      type: string
 *                      example: myUsername
 *                  password:
 *                      type: string
 *                      example: myPassword
  *      responses:
  *          '200':
  *              description: Resource added successfully
  *          '500':
  *              description: Internal server error
  *          '400':
  *              description: Bad request
  */

router.get("/reset", resetController.reset);
/**
 * @swagger
 * /users/reset:
 *   get:
 *      description: reset database
 *      tags:
 *          - users
 *      parameters:
 *          none
 *      responses:
 *          '200':
 *              description: Resource accessed successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

router.get("/getUsers", checkUser, usersController.getUsers);
/**
 * @swagger
 * /users/getUsers:
 *   get:
 *      description: Get all users
 *      tags:
 *          - users
 *      parameters:
 *          none
 *      responses:
 *          '200':
 *              description: Resource accessed successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */


router.get("/getUser", checkUser, usersController.getUser);
/**
 * @swagger
 * /users/getUser:
 *   get:
 *      description: Get get specified user
 *      tags:
 *          - users
 *      parameters:
 *          none
 *      responses:
 *          '200':
 *              description: Resource accessed successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

router.post("/login", checkUser, usersController.userLogin);
 /**
  * @swagger
  * /users/login:
  *   post:
  *      description: Get all users
  *      tags:
  *          - users
  *      parameters:
  *          - in: body
 *            name: User Login
 *            description: User Login
 *            schema:
 *              type: object
 *              required:
 *                 - username
 *                 - pasword
 *              properties:
 *                  username:
 *                      type: string
 *                      example: myUsername
 *                  password:
 *                      type: string
 *                      example: myPassword
  *      responses:
  *          '200':
  *              description: Resource added successfully
  *          '500':
  *              description: Internal server error
  *          '400':
  *              description: Bad request
  */

 module.exports = router;