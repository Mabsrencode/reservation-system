const Booking = require("../models/booking.model");
const mongoose = require("mongoose");
const createError = require("../utils/error");
// get all Bookings
const getBookings = async (req, res, next) => {
  try {
    const booking = await Booking.find({}).sort({ createdAt: -1 });
    res.status(200).json(booking);
  } catch (err) {
    next(err);
    console.log(err);
  }
};
//get single user
const getBooking = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such user found" });
    }
    const booking = await Booking.findOne({ _id: id });
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (err) {
    next(err);
    console.log(err);
  }
};
//create a user
const createBooking = async (req, res) => {
  const { email, phoneNumber, bookingDate } = req.body;
  //add doc to database
  try {
    const booking = await Booking.create({
      email,
      phoneNumber,
      bookingDate,
    });
    res.status(200).json(booking);
    console.log(booking);
  } catch (err) {
    next(err);
    console.log(err);
  }
};

//delete user
const deleteBooking = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such booking found" });
    }

    const booking = await Booking.findOneAndDelete({ _id: id });
    if (!booking) {
      return res.status(404).json({ error: "booking not found" });
    }
    res.status(200).json(booking);
  } catch (err) {
    next(err);
    console.log(err);
  }
};
// update user
const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "booking not found" });
    }
    const booking = await Booking.findOneAndUpdate(
      { _id: id },
      {
        ...req.body, //*$set: req.body,
      } //*{new: true}
    );
    if (!booking) {
      return res.status(404).json({ error: "booking not found" });
    }
    res.status(200).json(booking);
  } catch (err) {
    next(err);
    console.log(err);
  }
};

module.exports = {
  getBookings,
  getBooking,
  createBooking,
  deleteBooking,
  updateBooking,
};
