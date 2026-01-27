const mongoose = require("mongoose");
const Movie = require("../model/movie");
const User = require("../model/userSchema");
const Booking = require("../model/booking");

/* ================= CREATE BOOKING ================= */
const newbooking = async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();

    res.status(201).json({
      success: true,
      message: "Booking successful",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Booking failed",
      error: error.message,
    });
  }
};
/* ================= GET ALL BOOKINGS ================= */
const getallbookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("movie", "title price posterurl")
      .populate("user", "username email");

    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET BOOKINGS BY USER ================= */
const getBookingsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const bookings = await Booking.find({ user: userId })
      .populate("movie")
      .populate("user");

    return res.status(200).json(bookings);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch bookings",
      error: error.message,
    });
  }
};

/* ===== GET RESERVED SEATS ===== */
const getReservedSeats = async (req, res) => {
  try {
    const { movieId, date, time } = req.query;

    const bookings = await Booking.find({
      movie: movieId,
      date,
      time,
      bookingStatus: "CONFIRMED",
    }).select("seats");

    // flatten seats
    const reservedSeats = bookings.flatMap(b => b.seats);

    res.status(200).json({ reservedSeats });
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch reserved seats",
      error: err.message,
    });
  }
};


/* ================= UPDATE BOOKING ================= */
const updatebooking = async (req, res) => {
  try {
    const id = req.params.id;

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({
      message: "Booking updated successfully",
      booking: updatedBooking,
    });
  } catch (err) {
    res.status(500).json({
      message: "Update failed",
      error: err.message,
    });
  }
};

/* ================= DELETE BOOKING ================= */
const deletebooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    return res.status(200).json({ message: "Booking deleted" });
  } catch (error) {
    return res.status(500).json({
      message: "Delete failed",
      error: error.message,
    });
  }
};

module.exports = {
  newbooking,
  getallbookings,
  getBookingsByUser,
  updatebooking,
  deletebooking,
  getReservedSeats
};
