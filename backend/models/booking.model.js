const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
  {
    service: {
      type: String,
      required: true,
    },
    serviceId: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userNumber: {
      type: String,
      required: true,
    },
    selectedDate: {
      type: String,
      required: true,
    },
    selectedTime: {
      type: String,
      required: true,
    },
    vehiclePrice: {
      type: Number,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "booked",
    },
  },
  { timestamps: { type: String } }
);
module.exports = mongoose.model("Booking", bookingSchema);
