import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBookingsByUser, deleteBooking } from "../api-helpers/api-helpers";
import "./style.css";

function MyBookingsPage() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const userId = localStorage.getItem("userid");

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    const fetchBookings = async () => {
      const data = await getBookingsByUser(userId);
      setBookings(data);
    };

    fetchBookings();
  }, [userId, navigate]);

  const handlePrintTicket = (booking) => {
    localStorage.setItem("myBooking", JSON.stringify(booking));
    navigate("/ticket");
  };

  const handleCancel = async (id) => {
    await deleteBooking(id);
    setBookings((prev) => prev.filter((b) => b._id !== id));
  };

  return (
    <main className="main">
      <section className="hero">
        <h1>My Bookings</h1>
        <p>View and manage your booked movie tickets.</p>
      </section>

      <section className="movie-grid">
        {bookings.length === 0 ? (
          <p style={{ gridColumn: "1 / -1", textAlign: "center" }}>
            No bookings found.
          </p>
        ) : (
          bookings.map((booking) => (
            <div className="movie-card booking-card" key={booking._id}>
              <img
                src={booking.movie.posterurl}
                alt={booking.movie.title}
              />

              <h3>{booking.movie.title}</h3>

              <p><strong>Name:</strong> {booking.buyer.name}</p>
              <p><strong>Seats:</strong> {booking.seats.join(", ")}</p>
              <p>
                <strong>Date & Time:</strong> {booking.date} | {booking.time}
              </p>
              <p>
                <strong>Amount:</strong> ₹{booking.totalAmount}
              </p>

              <p className="payment-status paid">
                {booking.payment.status}
              </p>

              <div className="booking-actions">
                <button
                  className="ticket-btn"
                  onClick={() => handlePrintTicket(booking)}
                >
                  Get Ticket
                </button>

                <button
                  className="cancel-btn"
                  onClick={() => handleCancel(booking._id)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ))
        )}
      </section>
    </main>
  );
}

export default MyBookingsPage;
