const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png",
    },
    money: {
      type: Number,
      default: 0,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    followers: [{ type: ObjectId, ref: "user" }],
    following: [{ type: ObjectId, ref: "user" }],
    saved: [{ type: ObjectId, ref: "user" }],
    role: { type: ObjectId, ref: "role" },
    isBlocked: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
// Duplicate the ID field.
userSchema.virtual("id").get(function () {
  return this._id.toString();
});

// Ensure virtual fields are serialised.
userSchema.set("toJSON", {
  virtuals: true,
});
module.exports = mongoose.model("user", userSchema);
