const jwt = require("jsonwebtoken");
require("dotenv").config();

function Auth(req, res, next) {
  const token = req.cookies?.token; 

  if (!token) {
    return res.status(401).json({ message: "Please signin first" });
  }

  try {
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);

    req.user = {
      _id: decoded.userId,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = Auth;
