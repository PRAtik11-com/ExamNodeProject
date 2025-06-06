const userModel = require("../model/user.model");
const Sendmail = require("../utlis/sendmail");
const ejs = require("ejs");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require("path");

require("dotenv").config();

const usercontroller = {
   signup : async (req, res) => {
    const { name, email, password, age, city } = req.body;

    if (!name || !email || !password || !age || !city) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }

    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
        }

        const hash = await bcrypt.hash(password, 5);

        const user = await userModel.create({
        name,
        email,
        password: hash,
        age,
        city
        });

        const { password: _, ...userData } = user._doc;

        res.status(201).json({ message: "User created successfully", user: userData });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
},
  login: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
        return res.status(400).json({ message: "Create an account first" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.PRIVATE_KEY, {
        expiresIn: "7m",
        });

       
        res.cookie("token", token, {
        httpOnly: true,
        });

      
        const htmlTemplate = await ejs.renderFile(
        path.join(__dirname, "../views/confirmation.ejs"),
        { name: user.name }
        );

     
        await Sendmail(user.email, htmlTemplate, "Confirmation message");

        return res.status(200).json({
        message: "User logged in successfully",
        user: {
            name: user.name,
            email: user.email,
            age: user.age,
            city: user.city,
        },
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
},
  logout: async (req, res) => {
    try {
      res.clearCookie("token");
      res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

module.exports = usercontroller;
