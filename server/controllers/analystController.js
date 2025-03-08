const commentModel = require("../models/commentModel");
const groupModel = require("../models/groupModel");
const packageOrderModel = require("../models/packageOrderModel");
const packageTravelModel = require("../models/packageTravelModel");
const postModel = require("../models/postModel");
const userModel = require("../models/userModel");
const paymentModel = require("../models/paymentModel");

const moment = require("moment");
const clientModel = require("../models/clientModel");
const companyModel = require("../models/companyModel");
const currentYear = new Date().getFullYear();
moment.updateLocale("en", {
  week: {
    dow: 1, // Monday is the start of the week
  },
});
const startOfWeek = moment().startOf("week");
const endOfWeek = moment().endOf("week");
const analystController = {
  getDashboard: async (req, res) => {
    const totalPost = postModel.countDocuments();
    const totalComment = commentModel.countDocuments();
    const totalGroup = groupModel.countDocuments();
    const totalUser = userModel.countDocuments();

    const postsNumberInWeek = postModel
      .find({
        createdAt: {
          $gte: startOfWeek,
          $lte: endOfWeek,
        },
      })
      .select("_id")
      .lean()
      .countDocuments();

    const commentsNumberInWeek = commentModel
      .find({
        createdAt: {
          $gte: startOfWeek,
          $lte: endOfWeek,
        },
      })
      .select("_id")
      .lean()
      .countDocuments();

    const newNumberUserInWeek = userModel
      .find({
        createdAt: {
          $gte: startOfWeek,
          $lte: endOfWeek,
        },
      })
      .select("_id")
      .lean()
      .countDocuments();

    const newGroupsInWeek = groupModel
      .find({
        createdAt: {
          $gte: startOfWeek,
          $lte: endOfWeek,
        },
      })
      .select("_id")
      .lean()
      .countDocuments();

    const result = await Promise.all([
      totalPost,
      totalComment,
      totalUser,
      totalGroup,
      postsNumberInWeek,
      commentsNumberInWeek,
      newNumberUserInWeek,
      newGroupsInWeek,
    ]).then(
      ([
        totalPost,
        totalComment,
        totalUser,
        totalGroup,
        postsNumberInWeek,
        commentsNumberInWeek,
        newNumberUserInWeek,
        newGroupsInWeek,
      ]) => {
        const result = {
          postsNumberInWeek,
          commentsNumberInWeek,
          newNumberUserInWeek,
          newGroupsInWeek,
          increasePosts:
            parseInt(
              (postsNumberInWeek * 100) / (totalPost - postsNumberInWeek)
            ) || postsNumberInWeek * 100,
          increaseComments:
            parseInt(
              (commentsNumberInWeek * 100) /
                (totalComment - commentsNumberInWeek)
            ) || commentsNumberInWeek * 100,
          increaseNewUsers:
            parseInt(
              (newNumberUserInWeek * 100) / (totalUser - newNumberUserInWeek)
            ) || newNumberUserInWeek * 100,
          increaseNewsGroups:
            parseInt(
              (newGroupsInWeek * 100) / (totalGroup - newGroupsInWeek)
            ) || newGroupsInWeek * 100,
        };
        return result;
      }
    );

    return res.success(result);
  },
  getRevenueByMonthForEachPackage: async (req, res) => {
    const YEAR_BEFORE = "2022-12-31T07:02:19.305Z";
    const packages = await packageOrderModel.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(YEAR_BEFORE) },
        },
      },
      {
        $lookup: {
          from: "packages",
          localField: "package",
          foreignField: "_id",
          as: "package",
        },
      },
      {
        $unwind: "$package",
      },
      {
        $group: {
          _id: {
            packageId: "$package._id",
            month: { $month: "$createdAt" },
          },
          revenue: { $sum: "$package.price" },
          package: { $first: "$package.title" },
        },
      },
      {
        $group: {
          _id: "$_id.packageId",
          revenueByMonth: {
            $push: {
              month: "$_id.month",
              revenue: "$revenue",
            },
          },
          package: { $first: "$package" },
        },
      },
    ]);

    const totalRevenue = await packageOrderModel.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(YEAR_BEFORE) },
        },
      },
      {
        $lookup: {
          from: "packages",
          localField: "package",
          foreignField: "_id",
          as: "package",
        },
      },
      {
        $unwind: "$package",
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$package.price" },
        },
      },

      {
        $limit: 1,
      },
    ]);
    return res.success({
      totalRevenue: totalRevenue[0].totalRevenue,
      packages: packages,
    });
  },
  getSocialMedia: async (req, res) => {
    //Thanh toan
    // So Hoi nhom
    // Tong doanh nghiep
    //Tong nguoi dung

    const totalPayment = paymentModel.countDocuments();
    const totalGroup = groupModel.countDocuments();
    const totalClient = clientModel.countDocuments();
    const totalCompany = companyModel.countDocuments();

    const result = await Promise.all([
      totalPayment,
      totalGroup,
      totalClient,
      totalCompany,
    ]).then(([totalPayment, totalGroup, totalClient, totalCompany]) => {
      const result = {
        totalPayment,
        totalGroup,
        totalClient,
        totalCompany,
      };
      return result;
    });

    return res.success(result);
  },
  getPopularPost: async (req, res) => {
    const topPopulatedPosts = await postModel.aggregate([
      {
        $lookup: {
          from: "comments",
          localField: "comments",
          foreignField: "_id",
          as: "commentDetails",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "likes",
          foreignField: "_id",
          as: "likeDetails",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $addFields: {
          commentCount: { $size: "$commentDetails" },
          likeCount: { $size: "$likeDetails" },
          user: { $arrayElemAt: ["$user", 0] },
        },
      },
      {
        $sort: {
          commentCount: -1,
          likeCount: -1,
        },
      },
      {
        $project: {
          commentDetails: 0,
          likeDetails: 0,
          comments: 0,
          likes: 0,
        },
      },
      {
        $limit: 5,
      },
    ]);

    return res.success(topPopulatedPosts);
  },
  getPopularGroup: async (req, res) => {
    const topPopulatedGroups = await groupModel.aggregate([
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "group",
          as: "posts",
        },
      },
      {
        $addFields: {
          postCount: { $size: "$posts" },
          membersCount: { $size: "$members" },
        },
      },
      {
        $sort: {
          membersCount: -1,
          postCount: -1,
        },
      },
      {
        $limit: 6,
      },
      {
        $project: {
          avatar: 1,
          postCount: 1,
          membersCount: 1,
          name: 1,
          desc: 1,
        },
      },
    ]);
    return res.success(topPopulatedGroups);
  },
  getPopularUser: async (req, res) => {
    const topPopulatedGroups = await userModel.aggregate([
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "user",
          as: "posts",
        },
      },
      {
        $addFields: {
          postCount: { $size: "$posts" },
          followersCount: { $size: "$followers" },
        },
      },
      {
        $sort: {
          followersCount: -1,
          postCount: -1,
        },
      },
      {
        $limit: 6,
      },
      {
        $project: {
          avatar: 1,
          postCount: 1,
          followersCount: 1,
          username: 1,
          email: 1,
        },
      },
    ]);
    return res.success(topPopulatedGroups);
  },
  getAnalystPackage: async (req, res) => {
    const eachPackageByOrder = await packageOrderModel.aggregate([
      { $group: { _id: "$package", count: { $sum: 1 } } },
      {
        $lookup: {
          from: "packages", // Replace "packages" with the actual name of the "package" collection
          localField: "_id",
          foreignField: "_id",
          as: "packageDetails",
        },
      },
      { $unwind: "$packageDetails" },
      { $project: { packageName: "$packageDetails.title", count: 1, _id: 0 } },
    ]);
    return res.success(eachPackageByOrder);
  },

  getSummaryInYear: async (req, res) => {
    const queryByIdInYear = [
      {
        $match: {
          createdAt: {
            $gte: new Date(currentYear, 0, 1),
            $lt: new Date(currentYear + 1, 0, 1),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          month: "$_id",
          count: 1,
          _id: 0,
        },
      },
      { $sort: { month: 1 } },
    ];

    const summaryOrder = packageOrderModel.aggregate(queryByIdInYear);
    const summaryUser = clientModel.aggregate(queryByIdInYear);
    const summaryCompany = companyModel.aggregate(queryByIdInYear);

    const [summaryOrderRes, summaryUserRes, summaryCompanyRes] =
      await Promise.all([summaryOrder, summaryUser, summaryCompany]);
    return res.success({
      summaryOrder: { id: "Đơn hàng", data: summaryOrderRes },
      summaryUser: { id: "Số người dùng", data: summaryUserRes },
      summaryCompany: { id: "Số công ty", data: summaryCompanyRes },
    });
  },

  getSummaryMoneyInYear: async (req, res) => {
    const queryByMoneyPaymentInYear = [
      {
        $match: {
          createdAt: {
            $gte: new Date(currentYear, 0, 1),
            $lt: new Date(currentYear + 1, 0, 1),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          value: { $sum: "$money" },
        },
      },
      {
        $project: {
          month: "$_id",
          value: 1,
          _id: 0,
        },
      },
      { $sort: { month: 1 } },
    ];

    const summaryPayment = paymentModel.aggregate(queryByMoneyPaymentInYear);
    const summaryOrder = packageOrderModel.aggregate(queryByMoneyPaymentInYear);

    const [summaryOrderRes, summaryPaymentRes] = await Promise.all([
      summaryOrder,
      summaryPayment,
    ]);

    return res.success({
      summaryOrder: { id: "Doanh thu", data: summaryOrderRes },
      summaryPayment: { id: "Số Tiền thanh toán", data: summaryPaymentRes },
    });
  },

  getTopMostComment: async (req, res) => {
    const topMostCommentsInGroups = await groupModel.aggregate([
     
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "group",
          as: "posts",
        },
      },
      {
        $lookup: {
          from: "comments",
          localField: "posts._id",
          foreignField: "postId",
          as: "comments",
        },
      },
      {
        $match: {
          'comments.createdAt': {
            $gte: new Date(startOfWeek),
            $lt: new Date(endOfWeek),
          },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          commentCount: { $size: "$comments" },
        },
      },
      {
        $sort: { commentCount: -1 },
      },
      {
        $limit: 5,
      },
    ]);
    const topMostCommentsInUsers = await userModel.aggregate([
     
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "user",
          as: "posts",
        },
      },
      {
        $lookup: {
          from: "comments",
          localField: "posts._id",
          foreignField: "postId",
          as: "comments",
        },
      },
      {
        $match: {
          'comments.createdAt': {
            $gte: new Date(startOfWeek),
            $lt: new Date(endOfWeek),
          },
        },
      },
      {
        $lookup: {
          from: "clients",
          localField: "_id",
          foreignField: "user",
          as: "user",
        },
      },
      {
        $project: {
          _id: 1,
          fullname: { $arrayElemAt: ["$user.fullname", 0] },
          commentCount: { $size: "$comments" },
        },
      },
      {
        $sort: { commentCount: -1 },
      },
      {
        $limit: 5,
      },
    ]);
    return res.success({
      topMostCommentsInGroups: topMostCommentsInGroups,
      topMostCommentsInUsers: topMostCommentsInUsers,
    });
  },
};
module.exports = analystController;
