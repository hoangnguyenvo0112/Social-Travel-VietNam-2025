const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const friendSchema = new mongoose.Schema(
  {
    user: { type: ObjectId, ref: "user" },
    userId: {
      type: String,
      required: true,
      unique: true,
    },

    friendsRequest: [{ type: ObjectId, ref: "user" }],
    friends: [
      {
        user: { type: ObjectId, ref: "user" },
        status: { type: Number, default: 1 },
      },
    ],
  },
  {
    timestamps: true,
  }
);
// Duplicate the ID field.
friendSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
friendSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("friend", friendSchema);
