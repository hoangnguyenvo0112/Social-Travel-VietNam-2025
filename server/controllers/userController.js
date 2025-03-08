const { ROLE_ID } = require("../common/common");
const clientModel = require("../models/clientModel");
const companyModel = require("../models/companyModel");
const eventModel = require("../models/eventModel");
const friendModel = require("../models/friendModel");
const packageModel = require("../models/packageModel");
const packageOrderModel = require("../models/packageOrderModel");
const packageTravelModel = require("../models/packageTravelModel");
const userModel = require("../models/userModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");
const { uuid } = require("uuidv4");
const axios = require("axios");
const bcrypt = require("bcrypt");
const userController = {
  searchUser: async (req, res) => {
    try {
      0.0;
      if (req.query.username) {
        const users = await User.find({
          username: { $regex: req.query.username },
        })
          .limit(10)
          .select("fullname username avatar");
        res.json({ users });
      } else {
        const users = await User.find();
        res.json({ users });
      }
    } catch (err) {
      return res.error(500, err.message);
    }
  },
  getUserById: async (req, res) => {
    try {
      const me = req.user._id;
      const user = await User.findById(req.params.id)
        .select("-password")
        .populate("followers following role");

      if (!user) return res.status(400).json({ msg: "User does not exist." });
      let userDetail = {};
      console.log(user.role.roleId);
      if ([ROLE_ID.user, ROLE_ID.admin].includes(user.role.roleId)) {
        userDetail = await clientModel.findOne({ userId: req.params.id });
      } else if (user.role.roleId === ROLE_ID.company) {
        userDetail = await companyModel.findOne({ userId: req.params.id });
      }

      //Check is friend
      const isFriend = await friendModel.exists({
        userId: me,
        friends: {
          $elemMatch: { user: mongoose.Types.ObjectId(req.params.id) },
        },
      });
      const isSendingRequest = await friendModel.exists({
        userId: req.params.id,
        friendsRequest: { $in: [me] },
      });

      const isReceiveRequest = await friendModel.exists({
        userId: me,
        friendsRequest: { $in: [req.params.id] },
      });

      return res.success({
        user: user,
        userDetail: userDetail,
        status: {
          isFriend,
          isSendingRequest,
          isReceiveRequest,
        },
      });
    } catch (err) {
      return res.error(500, err.message);
    }
  },

  updateUser: async (req, res) => {
    try {
      const { avatar, fullname, mobile, address, story, website, gender } =
        req.body;
      if (!fullname)
        return res.status(400).json({ msg: "Please add your full name." });
      if ([ROLE_ID.user, ROLE_ID.admin].includes(req.user.roleId)) {
        await clientModel.findOneAndUpdate(
          { userId: req.user._id },
          {
            fullname,
            mobile,
            address,
            story,
            website,
            gender,
          }
        );
      }
      if (avatar) {
        await User.findOneAndUpdate(
          { _id: req.user._id },
          {
            avatar,
          }
        );
      }

      res.json({ msg: "Update Success!" });
    } catch (err) {
      return res.error(500, err.message);
    }
  },

  changePassword: async (req, res) => {
    const { oldPassword, password } = req.body;
    const me =await userModel.findById(req.user._id);
    const isMatchPassword =await  bcrypt.compare(oldPassword, me.password);
    if (!isMatchPassword) {
      return res.error(400, "Mật khẩu bạn nhập không chính xác");
    }
    if (password === oldPassword) {
      return res.error(400, "Bạn đang nhập mật khẩu hiện tại");
    }
    
    me.password =await bcrypt.hash(password, 12);
    await me.save();
    return res.success("Thay đổi mật khẩu thành công");
  },

  follow: async (req, res) => {
    try {
      const user = await User.find({
        _id: req.params.id,
        followers: req.user._id,
      });
      if (user.length > 0)
        return res.status(500).json({ msg: "You followed this user." });

      const newUser = await User.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: { followers: req.user._id },
        },
        { new: true }
      ).populate("followers following", "-password");

      await User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: { following: req.params.id },
        },
        { new: true }
      );

      res.json({ newUser });
    } catch (err) {
      return res.error(500, err.message);
    }
  },
  unfollow: async (req, res) => {
    try {
      const newUser = await User.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { followers: req.user._id },
        },
        { new: true }
      ).populate("followers following", "-password");

      await User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $pull: { following: req.params.id },
        },
        { new: true }
      );

      res.json({ newUser });
    } catch (err) {
      return res.error(500, err.message);
    }
  },

  getUserManager: async (req, res) => {
    const roleId = req.params.roleId;
    const me = req.user._id;
    let dataRes;
    if (roleId == ROLE_ID.user) {
      dataRes = await clientModel.find({ user: { $ne: me } }).populate({
        path: "user",
        populate: "role",
      });
    } else {
      dataRes = await companyModel.find().populate({
        path: "user",
        populate: "role",
      });
    }

    return res.success(dataRes);
  },
  getUserInfoFromBO: async (req, res) => {
    const me = req.user._id;
    const roleId = req.user.roleId;
    if (roleId === ROLE_ID.user) {
      return res.error("User cannot permission to access from BO");
    }
    const user = await User.findById(me)
      .select("-password")
      .populate({ path: "role", select: "roleId roleName" });

    if (!user) return res.status(400).json({ msg: "User does not exist." });
    let userDetail = {};
    if (roleId === ROLE_ID.company) {
      userDetail = await companyModel.findOne({ user: me });
    } else {
      userDetail = await clientModel.findOne({ user: me });
    }

    return res.success({
      user: user,
      userDetail: userDetail,
    });
  },
  getListPackage: async (req, res) => {
    const packages = await packageModel.find();
    return res.success(packages);
  },

  addOrUpdatePackage: async (req, res) => {
    const newPackages = req.body;
    if (!newPackages || !Array.isArray(newPackages) || newPackages.length < 1) {
      return res.error("packages are not valid");
    }
    //input
    /**
     * [
     *  {
     *    title:"",
     *     numberOfPost:"",
     *     price:1000,
     *     description:"Hello world"
     *  }
     * ]
     */
    await packageModel.remove();
    packageModel.insertMany(newPackages);
    return res.success("config package success");
  },
  registerPackage: async (req, res) => {
    const userId = req.user._id;
    const { packageId } = req.body;
    if (!packageId) {
      return res.error(400, "packageId is required");
    }
    const company = await companyModel.findOne({
      user: userId,
    });

    if (!company) {
      return res.error(400, "User is not has role company");
    }
    const package = await packageModel.findById(packageId);

    if (!package) {
      return res.error(400, "packageId is exist in system");
    }
    const user = await userModel.findById(req.user._id);
    if (user.money < package.price) {
      return res.error(
        400,
        "You don't have enough money to sign up for the package"
      );
    }

    const newPackageOrder = new packageOrderModel({
      company: company._id,
      package: package._id,
      numberOfPost: package.numberOfPost,
      orderId: uuid(),
      money: package.price,
    });
    newPackageOrder.save();

    user.money = user.money - package.price;
    user.save();
    return res.success(newPackageOrder);
  },
  getOrderDetail: async (req, res) => {
    const { orderId } = req.body;
    if (!orderId) {
      return res.error("orderId is required");
    }
    const order = await packageOrderModel
      .findById(orderId)
      .populate("package company");
    return res.success(order);
  },
  getPackageManager: async (req, res) => {
    const userId = req.user._id;
    const roleId = req.user.roleId;

    if (!roleId === ROLE_ID.company) {
      return res.error(400, "You do not permission to view package order");
    }
    const company = await companyModel.findOne({
      user: userId,
    });
    const packageOrder = await packageOrderModel.aggregate([
      {
        $match: { company: company._id },
      },
      {
        $group: {
          _id: "$company",
          total: { $sum: "$numberOfPost" },
        },
      },
      { $project: { _id: 0, total: 1 } },
    ]);
    console.log(packageOrder);
    if (!packageOrder || packageOrder.length === 0) {
      return res.success({
        isAllowPost: false,
        packageOrder: null,
      });
    }
    return res.success({
      isAllowPost: true,
      packageOrder: packageOrder[0],
    });
  },

  getPackageByCompany: async (req, res) => {
    const userId = req.user._id;
    const roleId = req.user.roleId;

    if (!roleId === ROLE_ID.company) {
      return res.error(400, "You do not permission to view package order");
    }
    const company = await companyModel.findOne({
      user: userId,
    });
    if (!company) {
      return res.error(400, "You do not permission to view package order");
    }
    const packageByCompany = await packageOrderModel
      .find({
        company: company._id,
        numberOfPost: { $gt: 0 },
      })
      .populate("package");
    return res.success(packageByCompany);
  },

  postPackageTravel: async (req, res) => {
    const {
      name,
      price,
      duration,
      address,
      numberOfPeople,
      description,
      imagesUrl,
      fromDate,
      company,
      package,
    } = req.body;

    const travel = new packageTravelModel({
      name,
      price,
      duration,
      address,
      numberOfPeople,
      description,
      imagesUrl,
      fromDate,
      company,
      package,
    });
    const newPackageTravel = await travel.save();
    const packageOrder = await packageOrderModel.findById(package);
    packageOrder.numberOfPost = packageOrder.numberOfPost - 1;
    await packageOrder.save();

    return res.success(newPackageTravel);
  },
  updatePackageTravel: async (req, res) => {
    const {
      name,
      price,
      duration,
      address,
      numberOfPeople,
      description,
      imagesUrl,
      fromDate,
      company,
      package,
      productId,
    } = req.body;
    if (!productId) {
      return res.error("cannot find product");
    }
    const packageTravel = await packageTravelModel.findById(productId);
    if (!packageTravel) {
      return res.error("cannot find product");
    }
    const updatedTravel = await packageTravelModel.findByIdAndUpdate(
      productId,
      {
        name,
        price,
        duration,
        address,
        numberOfPeople,
        description,
        imagesUrl,
        fromDate,
        company,
        package,
      },
      { new: true }
    );

    return res.success(updatedTravel);
  },

  recommendPackage: async (req, res) => {
    const packageTravel = await packageTravelModel.find().populate("company");
    return res.success(packageTravel);
  },
  recommendPackageById: async (req, res) => {
    const packageTravel = await packageTravelModel
      .findById(req.params.id)
      .populate("company");
    return res.success(packageTravel);
  },
  createEvent: async (req, res) => {
    const roleId = req.user.roleId;
    const userId = req.user._id;

    if (roleId === ROLE_ID.user) {
      return res.error("You do have permission to create events");
    }
    const { name, startDate, endDate } = req.body;

    if (!name || !startDate || !endDate) {
      return res.error("name and dates are required");
    }
    new eventModel({ name, startDate, endDate, user: userId }).save();
    return res.success("Create event success");
  },
  getMyEvents: async (req, res) => {
    const roleId = req.user.roleId;
    const userId = req.user._id;
    if (roleId === 0) {
      return res.error("You do have permission to see events");
    }
    const events = await eventModel.find({ user: userId });
    return res.success(events);
  },
  deleteEvent: async (req, res) => {
    const eventId = req.body.eventId;
    await eventModel.findByIdAndDelete(eventId);
    return res.success(true);
  },
  getPlaceAutoComplete: async (req, res) => {
    const input = req.query.input;
    const baseUrl =
      "https://maps.googleapis.com/maps/api/place/autocomplete/json?components=country:vn&key=AIzaSyAXK3kPMjlkrYVxsd_-6uQMQ8fXAO4b9n8";
    const config = {
      method: "get",
      url: `${baseUrl}&input=${input}`,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        return res.success(response.data);
      })
      .catch(function (error) {
        console.log(error);
        return res.error("error");
      });
  },
};

module.exports = userController;
