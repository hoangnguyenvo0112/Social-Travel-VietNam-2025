const mongoose = require("mongoose");
const locationSchema = new mongoose.Schema(
  {
    lat: { type: Number, require: true },
    lng: { type: Number, require: true },
    address:{type:String}
  },
  {
    timestamps: false,
  }
);
module.exports = mongoose.model("location", locationSchema);
