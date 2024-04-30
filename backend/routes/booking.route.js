require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");
const Booking = require("../models/booking.model");
const Service = require("../models/services.model"); //auto detailing model
const Carwash = require("../models/carwash.model"); //carwash package model
const stripeKey = process.env.STRIPE_TOKEN;
const stripe = require("stripe")(stripeKey);
const { v4: uuidv4 } = require("uuid");

router.post("/book-service", async (req, res) => {
  const {
    service,
    user_id,
    selectedDate,
    selectedTime,
    vehiclePrice,
    token,
    userEmail,
    userName,
    userNumber,
  } = req.body;
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const transactionId = generateRandomTransactionId();

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
        userEmail,
        userName,
        userNumber,
        selectedDate,
        selectedTime,
        vehiclePrice,
        transactionId: transactionId,
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
function generateRandomTransactionId() {
  const randomNumber = Math.floor(Math.random() * 1000000);
  return `TXN-${randomNumber}`;
}
//update status
router.post("/update-done", async (req, res) => {
  const { bookingId } = req.body;
  try {
    const booking = await Booking.findOne({ _id: bookingId });

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    //update the status to "done"
    booking.status = "done";
    await booking.save();

    res.send("Booking status updated successfully");
  } catch (error) {
    console.error("Update Done Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

//update ongoing
router.post("/update-ongoing", async (req, res) => {
  const { bookingId } = req.body;
  try {
    const booking = await Booking.findOne({ _id: bookingId });

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    //update the status to "done"
    booking.status = "ongoing";
    await booking.save();

    res.send("Booking status updated successfully");
  } catch (error) {
    console.error("Update Done Error:", error);
    return res.status(500).json({ error: "Internal server error" });
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
//*CANCEL
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
    const carwash = await Carwash.findOne({ _id: serviceId });

    if (service) {
      const updatedBookings = service.currentBookings.filter(
        (booking) => booking.bookingId.toString() !== bookingId
      );
      service.currentBookings = updatedBookings;
      await service.save();
      console.log("Service updated successfully");
    } else if (carwash) {
      const updatedBookings = carwash.currentBookings.filter(
        (booking) => booking.bookingId.toString() !== bookingId
      );
      carwash.currentBookings = updatedBookings;
      await carwash.save();
      console.log("Carwash updated successfully");
    } else {
      console.log("Service or Carwash not found");
    }

    res.send("Your booking cancelled successfully");
  } catch (error) {
    console.error("Cancel Booking Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

//delete
router.post("/delete-booking", async (req, res) => {
  const { bookingId } = req.body;
  try {
    const booking = await Booking.findOne({ _id: bookingId });

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    console.log("Deleting booking:", booking);

    await booking.deleteOne();

    console.log("Booking deleted successfully");

    res.send("Booking deleted successfully");
  } catch (error) {
    console.error("Delete Booking Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

//getall
router.get("/all-bookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ error });
  }
});
//*sms success booking
router.post("/send-message", async (req, res) => {
  try {
    console.log("Request to Semaphore:", req.body);
    const response = await axios.post(
      "https://semaphore.co/api/v4/messages",
      req.body
    );
    console.log("Semaphore API Response:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Semaphore API Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//*sms notify when going to qzone
router.post("/send-message-notify", async (req, res) => {
  try {
    console.log("Request to Semaphore:", req.body);
    const response = await axios.post(
      "https://semaphore.co/api/v4/messages",
      req.body
    );
    console.log("Semaphore API Response:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Semaphore API Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//*admin sms
router.post("/send-message-admin", async (req, res) => {
  try {
    console.log("Request to Semaphore:", req.body);
    const response = await axios.post(
      "https://semaphore.co/api/v4/messages",
      req.body
    );
    console.log("Semaphore API Response:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Semaphore API Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//!carwash
router.post("/book-carwash", async (req, res) => {
  const {
    service,
    user_id,
    selectedDate,
    selectedTime,
    vehiclePrice,
    token,
    userEmail,
    userName,
    userNumber,
  } = req.body;
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const transactionId = generateRandomTransactionId();

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
        userEmail,
        userName,
        userNumber,
        selectedDate,
        selectedTime,
        vehiclePrice,
        transactionId: transactionId,
      });

      const booking = await newBooking.save();

      const serviceTemp = await Carwash.findOne({ _id: service._id });
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
module.exports = router;
