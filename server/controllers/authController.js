const User = require("../models/userModel");
const Role = require("../models/roleModel");
const Company = require("../models/companyModel");
const Client = require("../models/clientModel");
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");
const Conversation = require("../models/conversationModel");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { ROLE_ID } = require("../common/common");
const { validGender } = require("../common/validate");
const { createAccessToken } = require("../common/jwt");
const friendModel = require("../models/friendModel");
const groupModel = require("../models/groupModel");
const notifyModel = require("../models/notifyModel");
const authController = {
  registerClient: async (req, res) => {
    try {
      const { fullname, username, email, password, gender } = req.body;
      if (!fullname || !username || !email || !password || !gender) {
        return res.error(400, "Vui lòng điền đầy đủ các thông tin");
      }
      if (!validGender(gender)) {
        return res.error(400, "Gender is not format");
      }
      const user_name = await User.findOne({ username: username });
      if (user_name) return res.error(400, "Tài khoản người dùng đã tồn tại");

      const emailRes = await User.findOne({ email });
      if (emailRes) return res.error(400, "Email người dùng đã tồn tại");

      if (password.length < 6)
        return res.error(400, "Mật khẩu phải có ít nhất 6 kí tự");

      const passwordHash = await bcrypt.hash(password, 12);
      const roleUser = await Role.findOne({ roleId: ROLE_ID.user });
      const user = new User({
        email,
        username,
        password: passwordHash,
        role: roleUser._id,
      });

      const userRes = await User.create(user);
      const newClient = new Client({
        user: userRes._id,
        userId: userRes._id,
        fullname,
        gender,
      });
      await Client.create(newClient);

      const accessToken = createAccessToken({
        userId: user._id,
        roleId: ROLE_ID.user,
      });

      const data = {
        accessToken,
      };

      return res.success(data);
    } catch (err) {
      return res.error(500, err.message);
    }
  },

  registerCompany: async (req, res) => {
    try {
      const {
        username,
        email,
        password,
        companyName,
        taxCode,
        address,
        avatar,
        image,
      } = req.body;
      if (!companyName || !username || !email || !password || !taxCode) {
        return res.error(400, "Vui lòng điền đầy đủ các thông tin.");
      }
      const userByUserName = await User.findOne({ username: username });
      if (userByUserName) return res.error(400, "Tài khoản đã tồn tại.");

      const userByEmail = await User.findOne({ email });
      if (userByEmail) return res.error(400, "Email đã tồn tại");

      if (password.length < 6)
        return res.error(400, "Mật khẩu phải có ít nhất 6 kí tự");

      const passwordHash = await bcrypt.hash(password, 12);
      const roleCompany = await Role.findOne({ roleId: ROLE_ID.company });

      const user = new User({
        email,
        username,
        password: passwordHash,
        role: roleCompany._id,
      });
      const userRes = await user.save();
      const newUser = new Company({
        user: userRes._id,
        userId: userRes._id,
        companyName,
        taxCode,
        address,
        avatar,
        image,
      });

      const accessToken = createAccessToken({
        userId: user._id,
        roleId: ROLE_ID.company,
      });
      await newUser.save();
      const data = {
        accessToken,
      };
      return res.success(data);
    } catch (err) {
      return res.error(500, err);
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.error(400, "email, password");
      }

      const me = await User.findOne({ email: email }).populate(
        "followers following role"
      );

      if (!me) {
        return res.error(401, "Tên tài khoản hoặc mật khẩu không chính xác");
      }

      const isMatch = await bcrypt.compare(password, me.password);
      if (!isMatch)
        return res.error(401, "Tên tài khoản hoặc mật khẩu không chính xác");

      const accessToken = createAccessToken({
        userId: me._id,
        roleId: me.role.roleId,
      });

      return res.success({
        accessToken,
        roleId: me.role.roleId,
        user: me,
      });
    } catch (err) {
      return res.error(401, err.message);
    }
  },
  logout: async (req, res) => {
    try {
      return res.json({ errorMessage: "Logged out!" });
    } catch (err) {
      return res.status(500).json({ errorMessage: err.message });
    }
  },

  clearUser: async (req, res) => {
    try {
      await friendModel.remove();
      await notifyModel.remove();
      // await groupModel.remove()
      return res.success(true);
    } catch (err) {
      return res.status(500).json({ errorMessage: err.message });
    }
  },

  isAccessSystem: async (req, res) => {
    const me = req.params.userId
    const userBlock = await User.findOne({
      isBlocked: true,
      _id: me,
    });
    if (userBlock) {
      return res.success(false);
    }
    return res.success(true);
  },
  blockUser: async (req, res) => {
    const userId = req.body.userId;

    // Only admin has permission to block user
    const roleId = req.user.roleId;

    if (roleId !== ROLE_ID.admin) {
      return res.error("You do not have permission");
    }

    const userClaim = await User.findOne({
      _id: userId,
    });

    userClaim.isBlocked = true;
    userClaim.save();
    return res.success("This user is has been blocked");
  },
  unBlockUser: async (req, res) => {
    const userId = req.body.userId;

    // Only admin has permission to block user
    const roleId = req.user.roleId;
    
    if (roleId !== ROLE_ID.admin) {
      return res.error("You do not have permission");
    }

    const userClaim = await User.findOne({
      _id: userId,
    });

    userClaim.isBlocked = false;
    userClaim.save();
    return res.success("This user is has been blocked");
  },
};

module.exports = authController;
