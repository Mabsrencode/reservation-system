const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: Number, required: true },
    bookingDate: { type: Date, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: { type: String } }
);

module.exports = mongoose.model("Booking", bookingSchema);
