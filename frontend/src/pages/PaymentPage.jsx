import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { newbooking } from "../api-helpers/api-helpers";
import "./style.css";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const booking =
    location.state ||
    JSON.parse(localStorage.getItem("bookingDetails"));

  const [cardNo, setCardNo] = useState("");
  const [loading, setLoading] = useState(false);

  if (!booking) {
    return <p style={{ textAlign: "center" }}>No booking found</p>;
  }

  const handlePayment = async (e) => {
    e.preventDefault();

    if (cardNo.length < 12) {
      alert("Invalid card number");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        movie: booking.movieId || booking.movie, // ✅ always ID
        user: localStorage.getItem("userid"),
        seats: booking.seats,
        date: booking.date,
        time: booking.time,
        buyer: booking.buyer,
        totalAmount: booking.totalAmount,
        payment: {
          status: "SUCCESS",
          method: "CARD",
          cardLast4: cardNo.slice(-4),
        },
      };

      const response = await newbooking(payload);

      if (response?.booking) {
        localStorage.setItem(
          "myBooking",
          JSON.stringify(response)
        );
        localStorage.removeItem("bookingDetails");

        alert("Payment Successful");
        navigate("/my-bookings");
      } else {
        throw new Error("Booking not created");
      }
    } catch (error) {
      alert("Payment failed");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="logincard">
        <h2 className="login-brand">SilverSeats</h2>
        <p className="login-tagline1">Payment</p>

        <div className="payment-summary">
          <p><strong>Movie:</strong> {booking.movieName}</p>
          <p><strong>Seats:</strong> {booking.seats.join(", ")}</p>
          <p><strong>Name:</strong> {booking.buyer.name}</p>
          <p><strong>Total:</strong> ₹{booking.totalAmount}</p>
        </div>

        <form onSubmit={handlePayment}>
          <input
            className="inputgroup"
            placeholder="Card Number"
            value={cardNo}
            onChange={(e) => setCardNo(e.target.value)}
            required
          />
          <input className="inputgroup" placeholder="Expiry (MM/YY)" required />
          <input className="inputgroup" placeholder="CVV" required />

          <button className="sub" type="submit" disabled={loading}>
            {loading ? "Processing..." : `Pay ₹${booking.totalAmount}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
