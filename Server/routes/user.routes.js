const express = require("express");
const usercontroller = require("../controller/user.controller");

const userRouter = express.Router();

userRouter.post("/signup",usercontroller.signup)
userRouter.post("/login",usercontroller.login)
userRouter.get("/logout",usercontroller.logout)


module.exports = userRouter