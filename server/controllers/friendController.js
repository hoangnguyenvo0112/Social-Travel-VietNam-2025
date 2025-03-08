const userModel = require("../models/userModel");
const friendModel = require("../models/friendModel");
const suggestFriendsModel = require("../recommender/suggestFriendsModel");

const friendController = {
  getMyFriend: async (req, res) => {
    const friendRes = await friendModel
      .findOne({ userId: req.user._id })
      .populate("friends.user", "username avatar ");
    return res.success(friendRes.friends);
  },
  addFriendRequest: async (req, res) => {
    const me = req.user._id;
    console.log(req.body);

    const friendId = req.body.userId;
    if (!friendId) {
      return res.error(400, "friendId is required");
    }
    const user = await userModel.findById(friendId);
    if (!user) {
      return res.error(400, "Not found user");
    }
    const myFriend = await friendModel.findOne({
      userId: me,
    });
    const yourFriends = await friendModel.findOne({
      userId: friendId,
    });
    if (!myFriend) {
      new friendModel({
        user: me,
        userId: me,
      }).save();
    }
    if (!yourFriends) {
      const response = new friendModel({
        user: friendId,
        userId: friendId,
        friendsRequest: [me],
      }).save();
      return res.success(response);
    } else {
      if (
        yourFriends.friendsRequest.includes(me) ||
        yourFriends.friends.some((user) => user._id.toString() == me)
      ) {
        return res.error(400, "You are sent request or this is my friend");
      }
      yourFriends.friendsRequest.push(me);
      const response = await yourFriends.save();
      return res.success(response);
    }
  },
  friendRequest: async (req, res) => {
    const friends = await friendModel
      .findOne({ userId: req.user._id })
      .populate("friendsRequest", "username id avatar");
    if (friends && friends.friendsRequest) {
      return res.success(friends.friendsRequest);
    }
    return res.success([]);
  },
  acceptRequest: async (req, res) => {
    if (!req.body.userId) {
      return res.error(400, "userId is required");
    }
    const myFriends = await friendModel.findOne({ userId: req.user._id });
    const yourFriends = await friendModel.findOne({ userId: req.body.userId });
    if (!myFriends || !yourFriends) {
      return res.error(400, "user is not sending request friend");
    }
    myFriends.friendsRequest.pull(req.body.userId);

    myFriends.friends.push({ user: req.body.userId });
    yourFriends.friends.push({ user: req.user._id });
    myFriends.save();
    yourFriends.save();
    return res.success({ myFriends: myFriends, yourFriends: yourFriends });
  },
  friendsSuggest: async (req, res) => {
    const friends = await friendModel.find();
    if(!friends){
      return res.success([])
    }
    const friendData = await friends.reduce((cur, user) => {
      cur[user.userId] = user.friends.map((friend) => friend.user.toString());
      return cur;
    }, {});
    if(!friendData||Object.keys(friendData).length===0){
      return res.success([])
    }
    const friendsRecommender = suggestFriendsModel(
      friendData,
      req.user._id.toString()
    );
    const friendByUserId = await friendModel.findOne({
      userId: req.user._id.toString(),
    });

    const friendsDb = await userModel
      .find({
        _id: {
          $in: friendsRecommender,
          $nin: friendByUserId.friendsRequest && friendByUserId.friendsRequest,
        },
      })
      .select("avatar username _id ");

    res.success(friendsDb);
  },
};
module.exports = friendController;
