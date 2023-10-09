const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema(
  {
    // firstName: { type: String, required: true },
    // lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    phoneNumber: { type: Number, required: true },
    bookingDate:{type: String, required: true},
    featured: { type: Boolean, default: false}
    // password: { type: String, required: true },
  },
  { timestamps: { type: String } }
);

module.exports = mongoose.model("Booking", bookingSchema);
