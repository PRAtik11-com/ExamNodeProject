const express = require("express");
const Auth = require("../middleware/auth");
const postcontroller = require("../controller/post.conroller");
const rateLimiter = require("../middleware/rateLimit");


const postRouter = express.Router();

postRouter.post("/createPost",Auth,rateLimiter,postcontroller.createPost)



module.exports = postRouter