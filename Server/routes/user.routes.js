const express = require("express");
const usercontroller = require("../controller/user.controller");
const rateLimiter = require("../middleware/rateLimit");

const userRouter = express.Router();

userRouter.post("/signup",rateLimiter,usercontroller.signup)
userRouter.post("/login",rateLimiter,usercontroller.login)
userRouter.get("/logout",usercontroller.logout)


module.exports = userRouter