const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const clientSchema = new mongoose.Schema(
  {
    user: { type: ObjectId, ref: "user" },
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    fullname: {
      type: String,
      trim: true,
    },
    gender: { type: String, default: "male" },
    mobile: { type: String, default: "" },
    address: { type: String, default: "" },
    story: {
      type: String,
      default: "",
    },

    website: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);
// Duplicate the ID field.
clientSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
clientSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("client", clientSchema);
