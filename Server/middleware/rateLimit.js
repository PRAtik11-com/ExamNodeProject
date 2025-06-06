const rateLimit = require("express-rate-limit");

const rateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, 
  max: 70,
  message: {
    message: "Too many requests.Try again after 10 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = rateLimiter;
