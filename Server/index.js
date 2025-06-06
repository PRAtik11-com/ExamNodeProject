const express = require("express")
var cookieParser = require("cookie-parser");
const { connection } = require("mongoose");
require("dotenv").config()

const app = express()

app.set("view engine", "ejs");
app.use(express.json());
app.use(cookieParser());



app.listen(process.env.PORT || 3000, async () => {
  try {
    await connection;
    console.log("server is running");
  } catch (error) {
    console.log(error);
  }
});