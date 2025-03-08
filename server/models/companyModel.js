const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const companySchema = new mongoose.Schema(
  {
    user: { type: ObjectId, ref: "user", require: true },
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    taxCode: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
// Duplicate the ID field.
companySchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
companySchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("company", companySchema);
