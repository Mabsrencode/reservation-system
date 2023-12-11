const mongoose = require("mongoose");

const carwashPackageSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    small: {
      type: Number,
      required: true,
    },
    medium: {
      type: Number,
      required: true,
    },
    large: {
      type: Number,
      required: true,
    },
    x_large: {
      type: Number,
      required: true,
    },
    currentBookings: [],
  },
  { timestamps: { type: String } }
);
module.exports = mongoose.model("Carwashes", carwashPackageSchema);
