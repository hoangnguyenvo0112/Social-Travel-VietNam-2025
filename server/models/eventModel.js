const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema(
  {
    name: {type:String, unique: true },
    startDate:{ type: Date, default: Date.now },
    endDate:{ type: Date, default: Date.now },
    user: { type: mongoose.Types.ObjectId, ref: "user" },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("event", eventSchema);