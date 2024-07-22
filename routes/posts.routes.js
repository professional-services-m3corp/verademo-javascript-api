const postsController = require("../controller/posts.controller");
const checkUser = require("../tools/checkUserToken.js")

var express = require("express");

var router = express.Router();

router.get("/getBlabsForMe", checkUser, postsController.getBlabsForMe);
/**
 * @swagger
 * /posts/getBlabsForMe:
 *   get:
 *      description: Get blabs written for user
 *      tags:
 *          - blabs
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

router.get("/getBlabsByMe", checkUser, postsController.getBlabsByMe);
/**
 * @swagger
 * /posts/getBlabsByMe:
 *   get:
 *      description: Get blabs written by user
 *      tags:
 *          - blabs
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

router.post("/addBlab", checkUser, postsController.addBlab);
/**
 * @swagger
 * /posts/addBlab:
 *   post:
 *      description: Used to add post
 *      tags:
 *          - blabs
 *      parameters:
 *          - in: body
 *            name: Post Blab
 *            description: Post Blab
 *            schema:
 *              type: object
 *              required:
 *                 - blab
 *              properties:
 *                  blab:
 *                      type: string
 *                      minLength: 1
 *                      maxLength: 1000
 *                      example: This is sample Blab
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */
router.get("/getAllBlabs", checkUser, postsController.getAllBlabs);
/**
 * @swagger
 * /posts/getAllBlabs:
 *   get:
 *      description: Get all blabs
 *      tags:
 *          - blabs
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */


router.post("/addBlabComment", checkUser, postsController.addBlabComment);
/**
 * @swagger
 * /posts/addBlabComment:
 *   post:
 *      description: Used to add Blab comment
 *      tags:
 *          - blabs
 *      parameters:
 *          - in: body
 *            name: Comment
 *            description: Blab Comment
 *            schema:
 *              type: object
 *              required:
 *                 - blabId
 *                 - comment
 *              properties:
 *                  blabId:
 *                      type: integer
 *                      example: 145
 *                  comment:
 *                      type: string
 *                      minLength: 1
 *                      maxLength: 1000
 *                      example: This is sample comment
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */
router.post("/getBlabComments", checkUser, postsController.getBlabComments);
/**
 * @swagger
 * /posts/getBlabComments:
 *   post:
 *      description: Used to get all comments of given blab id
 *      tags:
 *          - blabs
 *      parameters:
 *          - in: body
 *            name: blabid
 *            description: Blab ID
 *            schema:
 *              type: object
 *              required:
 *                 - blabid
 *              properties:
 *                  blabid:
 *                      type: integer
 *                      example: 1
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */


router.delete("/deleteBlab", checkUser, postsController.deleteBlab);
/**
 * @swagger
 * /posts/deleteBlab:
 *   delete:
 *      description: Used to delete Blab
 *      tags:
 *          - blabs
 *      parameters:
 *          - in: query
 *            name: blabId
 *            type: integer
 *            description: Blab id
 *            required: true
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */
module.exports = router;