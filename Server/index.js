const express = require("express")
var cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const userRouter = require("./routes/user.routes");
const connection = require("./config/db");
const postRouter = require("./routes/post.routes");
require("dotenv").config()

const app = express()

app.set("view engine", "ejs");
app.use(express.json());
app.use(cookieParser());

app.use("/api/user",userRouter)
app.use("/api/post",postRouter)


app.listen(process.env.PORT || 3000, async () => {
  try {
    await connection;
    console.log("server is running");
  } catch (error) {
    console.log(error);
  }
});