const rateLimit = require("express-rate-limit");

const rateLimiter = rateLimit({
  windowMs: 600000, 
  max: 70,
  message: {
    message: "Too many requests.Try again after 10 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = rateLimiter;
