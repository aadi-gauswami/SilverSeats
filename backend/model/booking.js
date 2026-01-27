const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Types.ObjectId,
      ref: "Movie",
      required: true,
    },

    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },

    seats: {
      type: [String],
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    buyer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      mobile: { type: String, required: true },
      address: { type: String, required: true },
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    payment: {
      status: {
        type: String,
        enum: ["SUCCESS", "FAILED", "PENDING"],
        default: "PENDING",
      },
      method: {
        type: String,
        enum: ["CARD", "UPI", "NETBANKING"],
        required: true,
      },
      cardLast4: String,
    },

    bookingStatus: {
      type: String,
      enum: ["CONFIRMED", "CANCELLED"],
      default: "CONFIRMED",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
