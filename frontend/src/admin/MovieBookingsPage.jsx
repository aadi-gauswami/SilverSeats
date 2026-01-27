import React, { useEffect, useState } from "react";
import {
  getAllBookings,
  deleteBooking,
} from "../api-helpers/api-helpers";
import "./adminMovies.css";

const MovieBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [cancelReasons, setCancelReasons] = useState({});

  const fetchBookings = async () => {
    try {
      const data = await getAllBookings();

      if (Array.isArray(data)) {
        setBookings(data);
      } else if (Array.isArray(data?.bookings)) {
        setBookings(data.bookings);
      } else {
        setBookings([]);
      }
    } catch (err) {
      console.error("Failed to fetch bookings", err);
      setBookings([]);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const cancelBooking = async (id) => {

    const confirm = window.confirm(
      "Are you sure you want to cancel this booking?"
    );
    if (!confirm) return;

    try {
      await deleteBooking(id);
      alert("Booking cancelled. ");

      fetchBookings();
    } catch (err) {
      alert("Failed to cancel booking");
    }
  };

  return (
    <div className="admin-page">
      {/* HEADER */}
      <header className="admin-header">
        <h1>SilverSeats Admin</h1>
        <p>Booking Management Panel</p>
      </header>

      {/* TABLE */}
      <div className="table-section">
        <h2>Booking List</h2>

        <table className="movie-table">
          <thead>
            <tr>
              <th>Movie</th>
              <th>User</th>
              <th>Name</th>
              <th>Seats</th>
              <th>Date</th>
              <th>Time</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Cancel</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: "center" }}>
                  No bookings found
                </td>
              </tr>
            ) : (
              bookings.map((b) => (
                <tr key={b._id}>
                  <td>{b.movie?.title || "N/A"}</td>
                  <td>{b.user?.email || "N/A"}</td>
                  <td>{b.buyer?.name || "N/A"}</td>
                  <td>{Array.isArray(b.seats) ? b.seats.join(", ") : "N/A"}</td>
                  <td>{b.date || "N/A"}</td>
                  <td>{b.time || "N/A"}</td>
                  <td>₹{b.totalAmount || "-"}</td>
                  <td>{b.payment?.status || "CONFIRMED"}</td>
                  <td>
                  
                    <button
                      className="danger"
                      onClick={() => cancelBooking(b._id)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MovieBookingsPage;
