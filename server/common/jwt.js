const jwt = require("jsonwebtoken");
const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: payload.expiresIn ? payload.expiresIn : "70d",
  });
};
module.exports = { createAccessToken };
