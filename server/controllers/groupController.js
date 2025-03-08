const groupModel = require("../models/groupModel");
const friendModel = require("../models/friendModel");
const postModel = require("../models/postModel");
const userModel=require('../models/userModel')

const groupController = {
  getDetailGroup: async (req, res) => {
    const groupId = req.params.id;
    const me = req.user._id;
    console.log(me);
    const infoGroup = await groupModel.findOne({
      _id: groupId,
    });
    if (!infoGroup) {
      return res.error(400, "This group is not exist");
    }

    const _isMember = groupModel.exists({
      _id: groupId,
      members: { $in: [me] },
    });
    const _isSendingRequest = groupModel.exists({
      _id: groupId,
      receiveRequests: { $in: [me] },
    });
    const _isReceiveRequest = groupModel.exists({
      _id: groupId,
      sendingRequests: { $in: [me] },
    });
    const _isOwner = groupModel.exists({
      _id: groupId,
      creator: me,
    });

    const friends =await friendModel
      .find({
        user: { $in: [...infoGroup.members, infoGroup.creator] },
        "friends.status": 1,
        "friends.user": { $in: [me] },
      })
      .select("user")
      .populate("user", "avatar username email")??[];
      
    const otherUsers =await userModel
      .find({
        _id: { $in: [...infoGroup.members,infoGroup.creator], $nin: [...friends.map(item=>item.user._id),me] },
       
      }).select("avatar username email")
    
  

    const [
      isMember,
      isSendingRequest,
      isReceiveRequest,
      isOwner,
      
    ] = await Promise.all([
      _isMember,
      _isSendingRequest,
      _isReceiveRequest,
      _isOwner,

    ]);
    return res.success({
      infoGroup: infoGroup,
      isMember: isMember,
      isSendingRequest: isSendingRequest,
      isReceiveRequest: isReceiveRequest,
      isOwner: isOwner,
      friends: friends && friends.map((item) => item.user),
      otherUsers: otherUsers ,
    });
  },
  getReceiveGroup: async (req, res) => {
    const me = req.user._id;
    const groups = await groupModel.find({
      sendingRequests: { $in: [me] },
    });
    return res.success(groups);
  },
  getMyGroup: async (req, res) => {
    const me = req.user._id;
    const groups = await groupModel.find({
      $or: [{ members: { $in: [me] } }, { creator: me }],
    }).sort("-createdAt");
    return res.success(groups);
  },
  getAll: async (req, res) => {
    const groups = await groupModel
      .find()
      .populate("creator", "username email ");
    res.success(groups);
  },
  createGroup: async (req, res) => {
    try {
      const { sendingRequests, name, avatar, images, desc, privacy, subTitle } =
        req.body;
      const newGroup = new groupModel({
        creator: req.user._id,
        sendingRequests,
        name,
        avatar,
        images,
        desc,
        privacy,
        subTitle,
      });

      await newGroup.save();

      return res.success({
        group: {
          ...newGroup._doc,
        },
      });
    } catch (err) {
      return res.error(500, err.message);
    }
  },
  joinGroup: async (req, res) => {
    const groupId = req.body.groupId;
    const me = req.user._id;
    if (!groupId) {
      return res.error(400, "groupId is required");
    }
    const group = await groupModel.findById(groupId);
    if (!group) {
      return res.error(400, "group not exist in system");
    }
    if (group.members.includes(me)) {
      return res.error(400, "you are joined this group");
    }
    group.receiveRequests.pull(me);
    group.sendingRequests.pull(me);
    group.members.push(me);
    await group.save();
    return res.success("join group success");
  },
  updateGroup: async (req, res) => {
    const me = req.user._id;
    const { groupId, desc, privacy } = req.body;
    const _isOwner = await groupModel.exists({
      _id: groupId,
      creator: me,
    });
    console.log({_isOwner,me,groupId})
    if (!_isOwner) {
      return res.error("You do not permission to update");
    }
    const _group = await groupModel.findByIdAndUpdate(
      groupId,
      {
        desc: desc,
        privacy: privacy,
      },
      { new: true }
    );
    return res.success(_group);
  },

  inviteToGroup: async (req, res) => {
    const { groupId, users } = req.body;
    const _group = await groupModel.findById(groupId);
    _group.sendingRequests.push(...users);
    await _group.save();
    return res.success(`Invites users to this group success`);
  },

  
};

module.exports = groupController;
