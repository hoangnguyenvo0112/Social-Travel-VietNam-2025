const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    token: {type:String},
    user: { type: mongoose.Types.ObjectId, ref: "user" },
    isVerify: { type: Boolean, default: false },
    money: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("payment", paymentSchema);
