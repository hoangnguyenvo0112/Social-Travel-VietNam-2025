const mongoose = require("mongoose");

const packageTravelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      default: 0,
    },

    fromDate:{
     type:Date
    },

    duration: {
      type: Number,
      required: true,
      default: 0,
    },
    
    address: {
      type: String,
     
    },
  
    description: {
      type: String,
    },
    numberOfPeople:{
      type: String,
    },
    imagesUrl: {
      type: Array,
    },
    package: { type: mongoose.Types.ObjectId, ref: "packageOrder", require: true },
    company: { type: mongoose.Types.ObjectId, ref: "company", require: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("packageTravel", packageTravelSchema);
