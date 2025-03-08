const mongoose = require("mongoose");

const packageOrderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
    },
    numberOfPost: {
      type: Number,
      default: 0,
    },
    money: {
      type: Number,
      default: 0,
    },
    package: { type: mongoose.Types.ObjectId, ref: "package", require: true },
    company: { type: mongoose.Types.ObjectId, ref: "company", require: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("packageOrder", packageOrderSchema);
