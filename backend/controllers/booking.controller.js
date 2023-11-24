const Booking = require("../models/booking.model");
const User = require("../models/user.model");
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
//create a booking
const createBooking = async (req, res, next) => {
  const { fullName, email, phoneNumber, bookingDate } = req.body;

  try {
    // Find the user based on the provided email
    const user = await User.findOne({ email });

    if (!user) {
      // If the user doesn't exist, you might want to handle this case accordingly.
      return res
        .status(404)
        .json({ error: "User not found for the provided email" });
    }

    // Create a new booking and link it to the user
    const booking = await Booking.create({
      fullName,
      email,
      phoneNumber,
      bookingDate,
      user: {
        _id: user._id,
        username: user.username, // Include the username in the booking
      }, // Link the booking to the user
    });

    // Add the booking to the user's booking array
    user.booking.push(booking._id);
    await user.save();

    res.status(200).json(booking);
  } catch (err) {
    next(err);
    console.log(err);
  }
};

//delete booking
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
// update booking
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
const cancelBooking = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such booking found" });
    }

    // Find the booking
    const booking = await Booking.findOne({ _id: id });

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Remove the booking reference from the user
    const user = await User.findOne({ _id: booking.user._id });
    user.booking.pull(booking._id);
    await user.save();

    // Delete the booking
    await Booking.findOneAndDelete({ _id: id });

    res
      .status(200)
      .json({ success: true, message: "Booking canceled successfully" });
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
  cancelBooking,
};
