require("dotenv").config();
const express = require("express");
const router = express.Router();
const Booking = require("../models/booking.model");
const Service = require("../models/services.model");
const stripeKey = process.env.STRIPE_TOKEN;
const stripe = require("stripe")(stripeKey);
const { v4: uuidv4 } = require("uuid");
router.post("/book-service", async (req, res) => {
  const { service, user_id, selectedDate, selectedTime, vehiclePrice, token } =
    req.body;
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const payment = await stripe.charges.create(
      {
        amount: vehiclePrice * 100,
        customer: customer.id,
        currency: "PHP",
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );
    if (payment) {
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
    }
    res.send("Payment Successful!");
  } catch (error) {
    console.log(error);
  }
});

router.post("/booking-id", async (req, res) => {
  const user_id = req.body.user_id;
  try {
    const bookings = await Booking.find({ user_id: user_id });
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/cancel-booking", async (req, res) => {
  const { bookingId, serviceId } = req.body;
  try {
    console.log("Cancel Booking Request:", { bookingId, serviceId });

    const bookingItem = await Booking.findOne({ _id: bookingId });
    console.log("Booking Item:", bookingItem);

    if (!bookingItem) {
      return res.status(404).json({ error: "Booking not found" });
    }

    bookingItem.status = "cancelled";
    await bookingItem.save();

    const service = await Service.findOne({ _id: serviceId });
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    const bookings = service.currentBookings;
    const temp = bookings.filter(
      (booking) =>
        booking &&
        booking.bookingId &&
        booking.bookingId.toString() !== bookingId
    );
    service.currentBookings = temp;

    await service.save();

    res.send("Your booking cancelled successfully");
  } catch (error) {
    console.error("Cancel Booking Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
