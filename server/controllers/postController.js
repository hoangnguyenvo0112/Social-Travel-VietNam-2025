const postModel = require("../models/postModel");
const Comments = require("../models/commentModel");
const Users = require("../models/userModel");
const friendModel = require("../models/friendModel");
const mongoose = require("mongoose");
const groupModel = require("../models/groupModel");
const locationModel = require("../models/locationModel");
const storyModel = require("../models/storyModel");
const { AUDIENCE } = require("../common/common");

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const postController = {
  myStory: async (req, res) => {
    const me = req.user._id;
    const myFriends = await friendModel.findOne({
      userId: me,
    });
    const friendIds = myFriends?.friends.map((friend) => friend.user) ?? [];
    const story = await storyModel
      .find({
        user: { $in: [me, ...friendIds] },
      })
      .sort("-createdAt")
      .populate("user", "avatar username");

    return res.success(story);
  },
  addStory: async (req, res) => {
    const { content, thumbnail, videoUrl } = req.body;
    const user = req.user._id;
    const story = new storyModel({
      content,
      thumbnail,
      videoUrl,
      user,
    });
    const savedStory = await story.save();
    return res.success(savedStory);
  },
  deleteStory: async (req, res) => {
    const storyId = req.body.storyId;
    await storyModel.findByIdAndDelete(storyId);
    return res.success("Delete story successfully");
  },
  createPost: async (req, res) => {
    try {
      const {
        content,
        images,
        group,
        location,
        feeling,
        listTagUser = [],
        audience = 2,
      } = req.body;
      if (images.length === 0) return res.error(400, "Please add your photo.");

      let locationId;
      if (location) {
        const locationModelData = new locationModel({
          lat: location.lat,
          lng: location.lng,
          address: location.address,
        });
        const savedLocation = await locationModelData.save();
        locationId = savedLocation._id;
      }
      const newPost = new postModel({
        content,
        images,
        group,
        user: req.user._id,
        feeling,
        listTagUser,
        location: locationId,
        audience,
      });

      await newPost.save();

      return res.success({
        newPost: {
          ...newPost._doc,
          user: req.user,
        },
      });
    } catch (err) {
      return res.error(500, err.message);
    }
  },
  getPosts: async (req, res) => {
    const me = req.user._id;
    const myFriends = await friendModel.findOne({
      userId: me,
    });
    const friendIds = myFriends?.friends.map((friend) => friend.user) ?? [];
    const features = new APIfeatures(
      postModel.find({
        user: { $in: [me, ...friendIds, ...req.user.following] },
        group: { $exists: false }
      }),
      req.query
    ).paginating();

    const posts = await features.query
      .sort("-createdAt")
      .populate(
        "user likes location",
        "avatar username fullname followers lat lng address"
      )
      .populate({
        path: "listTagUser",
        select: "avatar username",
      })
      .populate({
        path: "likes",
        select: "username",
      })
      .populate({
        path: "comments",
        populate: {
          path: "user likes",
          select: "-password",
        },
      });
   
    const postFilter = posts.filter((post) => {
      const postByMe = (post.user?._id).toString();
      return (
        (postByMe == me.toString()) ||
        (post.audience === AUDIENCE.friend &&
          friendIds &&
          friendIds.length &&
          friendIds.includes(post.user.id)) ||
        post.audience === AUDIENCE.public
      );
    });
    return res.json({
      result: postFilter.length,
      posts: postFilter,
    });
  },
  getPostByGroupId: async (req, res) => {
    const groupId = req.params.groupId;
    if (!mongoose.Types.ObjectId.isValid(groupId)) {
      return res.error(400, "groupId is invalid type");
    }
    const group = await groupModel.findById(groupId);
    if (!group) {
      return res.error(400, "group is not exist");
    }
    const features = new APIfeatures(
      postModel.find({
        group: req.params.groupId,
      }),
      req.query
    ).paginating();

    const posts = await features.query
      .sort("-createdAt")
      .populate("user likes", "avatar username fullname followers")
      .populate({
        path: "comments",
        populate: {
          path: "user likes",
          select: "-password",
        },
      });

    return res.success({
      result: posts.length,
      posts,
    });
  },
  updatePost: async (req, res) => {
    try {
      const { content, images } = req.body;

      const post = await postModel
        .findOneAndUpdate(
          { _id: req.params.id },
          {
            content,
            images,
          }
        )
        .populate("user likes", "avatar username fullname")
        .populate({
          path: "comments",
          populate: {
            path: "user likes",
            select: "-password",
          },
        });

      res.json({
        msg: "Updated Post!",
        newPost: {
          ...post._doc,
          content,
          images,
        },
      });
    } catch (err) {
      return res.error(500, err.message);
    }
  },
  likePost: async (req, res) => {
    try {
      const post = await postModel.find({
        _id: req.params.id,
        likes: req.user._id,
      });
      if (post.length > 0)
        return res.status(400).json({ msg: "You liked this post." });

      const like = await postModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: { likes: req.user._id },
        },
        { new: true }
      );

      if (!like)
        return res.status(400).json({ msg: "This post does not exist." });

      res.json({ msg: "Liked Post!" });
    } catch (err) {
      return res.error(500, err.message);
    }
  },
  unLikePost: async (req, res) => {
    try {
      const like = await postModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { likes: req.user._id },
        },
        { new: true }
      );

      if (!like)
        return res.status(400).json({ msg: "This post does not exist." });

      res.json({ msg: "UnLiked Post!" });
    } catch (err) {
      return res.error(500, err.message);
    }
  },
  getUserPosts: async (req, res) => {
    try {
      
      const me=req.user._id
      const myFriends = await friendModel.findOne({
        userId: me,
      });
    
      const friendIds = myFriends?.friends.map((friend) => friend.user) ?? [];
      const features = new APIfeatures(
        postModel.find({ user: req.params.id }),
        req.query
      ).paginating();
      const posts = await features.query.sort("-createdAt");

      const postFilter = posts.filter((post) => {
        const postByMe = (post.user?._id).toString();
        return (
          (postByMe == me.toString() && post.audience === AUDIENCE.onlyMe) ||
          (post.audience === AUDIENCE.friend &&
            friendIds &&
            friendIds.length &&
            friendIds.includes(post.user)) ||
          post.audience === AUDIENCE.public
        );
      });

      return res.json({
        posts:postFilter,
        result: postFilter.length,
      });
    } catch (err) {
      return res.error(500, err.message);
    }
  },
  getPost: async (req, res) => {
    const post = await postModel
      .findById(req.params.id)
      .populate(
        "user likes location",
        "avatar username fullname followers lat lng address"
      )
      .populate({
        path: "listTagUser",
        select: "avatar username",
      })
      .populate({
        path: "comments",
        populate: {
          path: "user likes",
          select: "-password",
        },
      });

    if (!post)
      return res.status(400).json({ msg: "This post does not exist." });

    res.json({
      post,
    });
  },
  getPostsDiscover: async (req, res) => {
    try {
      const newArr = [req.user._id];
      const num = req.query.num || 9;
      const posts = await postModel.aggregate([
        { $match: { user: { $nin: newArr }, audience: AUDIENCE.public } },
        { $sample: { size: Number(num) } },
      ]);

      return res.json({
        msg: "Success!",
        result: posts.length,
        posts,
      });
    } catch (err) {
      return res.error(500, err.message);
    }
  },
  deletePost: async (req, res) => {
    try {
      const post = await postModel.findOneAndDelete({
        _id: req.params.id,
        user: req.user._id,
      });
      await Comments.deleteMany({ _id: { $in: post.comments } });

      res.json({
        msg: "Deleted Post!",
        newPost: {
          ...post,
          user: req.user,
        },
      });
    } catch (err) {
      return res.error(500, err.message);
    }
  },
  savePost: async (req, res) => {
    try {
      const user = await Users.find({
        _id: req.user._id,
        saved: req.params.id,
      });
      if (user.length > 0)
        return res.status(400).json({ msg: "You saved this post." });

      const save = await Users.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: { saved: req.params.id },
        },
        { new: true }
      );

      if (!save)
        return res.status(400).json({ msg: "This user does not exist." });

      res.json({ msg: "Saved Post!" });
    } catch (err) {
      return res.error(500, err.message);
    }
  },
  unSavePost: async (req, res) => {
    try {
      const save = await Users.findOneAndUpdate(
        { _id: req.user._id },
        {
          $pull: { saved: req.params.id },
        },
        { new: true }
      );

      if (!save)
        return res.status(400).json({ msg: "This user does not exist." });

      res.json({ msg: "unSaved Post!" });
    } catch (err) {
      return res.error(500, err.message);
    }
  },
  getSavePosts: async (req, res) => {
    try {
      const features = new APIfeatures(
        postModel.find({
          _id: { $in: req.user.saved },
        }),
        req.query
      ).paginating();

      const savePosts = await features.query.sort("-createdAt");

      res.json({
        savePosts,
        result: savePosts.length,
      });
    } catch (err) {
      return res.error(500, err.message);
    }
  },
  updateAudience: async (req, res) => {
    const postId = req.body.postId;
    const audience = req.body.audience;
    const post = await postModel.findById(postId);
    if (!post) {
      return res.error(400, "Post is not exist");
    }
    post.audience = audience;
    await post.save();
    return res.success("Update audience success");
  },
};

module.exports = postController;
