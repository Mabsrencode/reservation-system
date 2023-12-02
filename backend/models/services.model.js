const mongoose = require("mongoose");

const servicesSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    small: {
      type: String,
      required: true,
    },
    medium: {
      type: String,
      required: true,
    },
    large: {
      type: String,
      required: true,
    },
    x_large: {
      type: String,
      required: true,
    },
  },
  { timestamps: { type: String } }
);
module.exports = mongoose.model("Services", servicesSchema);
