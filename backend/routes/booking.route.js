const express = require("express");
const router = express.Router();
const Booking = require("../models/booking.model");
const Service = require("../models/services.model");

router.post("/book-service", async (req, res) => {
  const { service, user_id, selectedDate, selectedTime, vehiclePrice } =
    req.body;

  try {
    const newBooking = new Booking({
      service: service.title,
      serviceId: service._id,
      user_id,
      selectedDate,
      selectedTime,
      vehiclePrice,
      transactionId: "1234",
    });
    const booking = await newBooking.save();

    const serviceTemp = await Service.findOne({ _id: service._id });
    serviceTemp.currentBookings.push({
      bookingId: booking._id,
      selectedDate: selectedDate,
      selectedTime: selectedTime,
      user_id: user_id,
      status: booking.status,
    });

    await serviceTemp.save();
    res.status(200).json({ message: "Service booked successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error booking service" });
  }
});

module.exports = router;
