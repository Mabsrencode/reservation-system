const express = require("express");
const {
  getBookings,
  getBooking,
  createBooking,
  deleteBooking,
  updateBooking,
  cancelBooking,
} = require("../controllers/booking.controller");
const { verifyAdmin } = require("../utils/verifyToken");
const router = express.Router();

router.post("/", verifyAdmin, createBooking);
router.post("/cancel/:id", verifyAdmin, cancelBooking);
router.patch("/:id", verifyAdmin, updateBooking);

router.delete("/:id", verifyAdmin, deleteBooking);

router.get("/:id", getBooking);

router.get("/", getBookings);

module.exports = router;
