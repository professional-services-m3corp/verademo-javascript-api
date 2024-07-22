const usersController = require("../controller/users.controller");
const resetController = require("../controller/reset.controller.js")
const checkUser = require("../tools/checkUserToken.js")

var express = require("express");

var router = express.Router();

router.get("/getBlabbers", checkUser, usersController.getBlabbers);

router.post("/ignore", checkUser, usersController.ignore);

router.post("/listen", checkUser, usersController.listen);

router.get("/getProfileInfo", checkUser, usersController.getProfileInfo);

router.get("/getEvents", checkUser, usersController.getEvents);

router.post("/updateProfile", checkUser, usersController.updateProfile);

router.post("/register", usersController.register);

router.get("/getUsers", checkUser, usersController.getUsers);

router.get("/getUser", checkUser, usersController.getUser);

router.get("/reset", checkUser, resetController.reset);
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
 *              description: Resource added successfully
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