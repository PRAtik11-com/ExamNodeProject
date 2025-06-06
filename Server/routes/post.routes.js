const express = require("express");
const Auth = require("../middleware/auth");
const postcontroller = require("../controller/post.conroller");
const rateLimiter = require("../middleware/rateLimit");


const postRouter = express.Router();

postRouter.post("/createPost",Auth,rateLimiter,postcontroller.createPost)
postRouter.get("/getPosts",Auth,postcontroller.getPosts)
postRouter.patch("/updatePosts/:id",Auth,postcontroller.updatePosts)
postRouter.delete("/deletePosts/:id",Auth,postcontroller.deletePosts)




module.exports = postRouter