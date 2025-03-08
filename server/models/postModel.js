const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    content: String,
    images: {
      type: Array,
      required: true,
    },
    likes: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    comments: [{ type: mongoose.Types.ObjectId, ref: "comment" }],
    user: { type: mongoose.Types.ObjectId, ref: "user" },
    listTagUser: [{ type: mongoose.Types.ObjectId, ref: "user", default: [] }],
    location: {
      type: mongoose.Types.ObjectId,
      ref: "location",
    },
    feeling: {
      type: String,
    },
    group: { type: mongoose.Types.ObjectId, ref: "group" },

    // 0:only me, 1 friends, 2 public
    audience: {
      type: Number,
      default: 2,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("post", postSchema);
