const express = require("express");
const {
  getBookings,
  getBooking,
  createBooking,
  deleteBooking,
  updateBooking,
} = require("../controllers/booking.controller");
const { verifyAdmin } = require("../utils/verifyToken");
const router = express.Router();

router.post("/",verifyAdmin, createBooking);

router.patch("/:id",verifyAdmin, updateBooking);

router.delete("/:id",verifyAdmin, deleteBooking);

router.get("/:id", getBooking);

router.get("/", getBookings);









module.exports = router;
