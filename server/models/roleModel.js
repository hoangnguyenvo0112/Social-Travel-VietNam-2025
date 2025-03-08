const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    roleName: {
      type: String,
      required: true,
      unique: true,
    },
    roleId: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model("role", roleSchema);
