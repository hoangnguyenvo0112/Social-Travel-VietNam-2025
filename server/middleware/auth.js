const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) return res.status(400).json({ msg: "Invalid Authentication." });

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!decoded || decoded.roleId === undefined)
      return res.status(400).json({ msg: "Invalid Authentication." });

    const user = await User.findOne({ _id: decoded.userId });

    req.user = user;
    req.user.roleId = decoded.roleId;
    next();
  } catch (err) {
    return res.error(500, err.message);
  }
};

module.exports = auth;
