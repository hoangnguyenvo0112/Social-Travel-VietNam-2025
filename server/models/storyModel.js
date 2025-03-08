const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
  {
    content: String,
    thumbnail: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    user: { type: mongoose.Types.ObjectId, ref: "user", required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("story", storySchema);
