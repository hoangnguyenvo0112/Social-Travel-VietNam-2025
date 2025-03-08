const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
  {
    creator: { type: mongoose.Types.ObjectId, ref: "user" },
    members: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    sendingRequests: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    receiveRequests: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    subTitle:String,
    name: String,
    avatar: String,
    images: Array,
    desc: String,
    privacy: String,
  },
  {
    timestamps: true,
  }
);
groupSchema.virtual("id").get(function () {
  return this._id.toString();
});
module.exports = mongoose.model("group", groupSchema);
