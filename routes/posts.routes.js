const postsController = require("../controller/posts.controller");
const checkUser = require("../tools/checkUserToken.js")

var express = require("express");

var router = express.Router();

/**
 * @swagger
 * /posts/getBlabsForMe:
 *   get:
 *     description: Get blabs written for user
 *     tags:
 *       - blabs
 *     responses:
 *         '200':
 *             description: Resource added successfully
 *         '500':
 *             description: Internal server error
 *         '400':
 *             description: Bad request
*/
router.get("/getBlabsForMe", checkUser, postsController.getBlabsForMe);


/**
 * @swagger
 * /posts/getBlabsByMe:
 *   get:
 *    description: Get blabs written by user
 *    tags:
 *      - blabs
 *    responses:
 *      '200':
 *        description: Resource added successfully
 *      '500':
 *        description: Internal server error
 *      '400':
 *        description: Bad request
*/
router.get("/getBlabsByMe", checkUser, postsController.getBlabsByMe);

/**
 * @swagger
 * /posts/addBlab:
 *   post:
 *     summary: add a blab to db
 *     tags:
 *       - blabs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               blab:
 *                 type: string
 *                 description: The blab to write
 *                 example: "This is a test blab"
 *     responses:
 *       '200':
 *           description: Database changed successfully
 *       '500':
 *           description: Internal server error
 *       '400':
 *           description: Bad request
*/
router.post("/addBlab", checkUser, postsController.addBlab);

/**
@swagger
 * /posts/getAllBlabs:
 *   get:
 *     description: Get all blabs
 *     tags:
 *         - blabs
 *     responses:
 *       '200':
 *         description: Resource received successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       blabid:
 *                         type: integer
 *                         description: blabid
 *                         example: 1
 *                       blabber:
 *                         type: string
 *                         description: user blab name
 *                         example: paul
 *                       content:
 *                         type: string
 *                         description: Blab content.
 *                         example: "Example blab content"
 *       '500':
 *         description: Internal server error
 *       '400':
 *         description: Bad request
*/
router.get("/getAllBlabs", checkUser, postsController.getAllBlabs);


/**
 * @swagger
 * /posts/addBlabComment:
 *   post:
 *     summary: add a comment to blab
 *     tags:
 *       - blabs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               blabId:
 *                 type: integer
 *                 description: The the blabId to comment on
 *                 example: 72
 *               comment:
 *                 type: string
 *                 description: The comment text
 *                 example: "Test comment"
 *     responses:
 *       '200':
 *         description: Resource added successfully
 *       '500':
 *           description: Internal server error
 *       '400':
 *           description: Bad request
*/
router.post("/addBlabComment", checkUser, postsController.addBlabComment );

/**
 * @swagger
 * /posts/getBlabComments:
 *   post:
 *     description: Get all blabs
 *     tags:
 *         - blabs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               blabId:
 *                 type: integer
 *                 description: The blab to get comments for
 *                 example: 1
 *     responses:
 *       '200':
 *         description: Resource received successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       blabid:
 *                         type: integer
 *                         description: blabid
 *                         example: 1
 *                       blabber:
 *                         type: string
 *                         description: user blab name
 *                         example: paul
 *                       content:
 *                         type: string
 *                         description: Blab content.
 *                         example: "Example blab content"
 *       '500':
 *         description: Internal server error
 *       '400':
 *         description: Bad request
*/
router.post("/getBlabComments", checkUser, postsController.getBlabComments);

/**
 * @swagger
 *   /posts/deleteBlab:
 *     delete:
 *        description: Used to delete Blab
 *        tags:
 *            - blabs
 *        parameters:
 *            - in: query
 *              name: blabId
 *              type: integer
 *              description: Blab id
 *              required: true
 *        responses:
 *            '200':
 *                description: Resource added successfully
 *            '500':
 *                description: Internal server error
 *            '400':
 *                description: Bad request 
*/
router.delete("/deleteBlab", checkUser, postsController.deleteBlab);

  
 
module.exports = router;