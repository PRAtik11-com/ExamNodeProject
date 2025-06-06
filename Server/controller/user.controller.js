const userModel = require("../model/user.model");
const CreateOtpAndToken = require("../utlis/otp");
const Sendmail = require("../utlis/sendmail");
const ejs = require("ejs");

const usercontroller = {
    signup : async(req,res) => {
        const {name,email,password,age,city} = req.body;

        if (!name || !email || !password || !age || !city) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        try {
            const isexistingUser = await userModel.findOne({ email });
            
            if (isexistingUser) {
                return res.status(400).json({ message: "User already exists" });
            }
            bcrypt.hash(password, 5, async(err, hash)=> {
                if (err) {
                    return res.status(400).json({ message:err.message });
                }
                
                if (hash) {
                    const result = await userModel.create({name,email,password:hash})
                    const {password,...rest} = result._doc
                    res.status(201).json({ message: "User created successfully",user: rest});
                }
                
            });

        } catch (error) {
            res.status(400).json({message:error.message})
        } 

    },
    login:async(req,res) =>{
        const { email, password } = req.body;

        if (!email || !password) {
        return res
            .status(400)
            .json({ message: "Email and password are required" });
        }
        try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "create an account first" });
        }
        if (user.password !== password) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const pass = await bcrypt.compare(password, user.password);
        if (!pass) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = await jwt.sign({ userId: user._id },process.env.PRIVATE_KEY,{expiresIn: "7m",});
        res.cookie("token", "user logged in", {
            httpOnly: true,}).status(200).json({
            message: "User logged in successfully",
            user: {
                name: user.name,
                email: user.email,
                age: user.age,
                city: user.city,
            },
            });
        const htmltemplate = await ejs.renderFile(
            __dirname + "/../views/confirmation.ejs",
            {
            name: user.name,
            }
        );

        await Sendmail(userData.email, htmltemplate, " conformationn message");
        return res.status(200).json({ message: "accoun created" });
        } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        }
    },
    logout: async (req, res) => {
        try {
        res.clearCookie("token")
        res.status(200).json({ message: "User logged out successfully" });
        } catch (error) {
        res.status(400).json({message:error.message})
        }
        
    }
    
}

module.exports = usercontroller;