import React, { useEffect, useState } from "react";
import "./ticket.css";

const TicketPage = () => {
  const [booking, setBooking] = useState(null);

  /* ===== LOAD BOOKING ===== */
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("myBooking"));
    setBooking(stored);
  }, []);


  if (!booking) {
    return <p style={{ textAlign: "center" }}>No ticket found</p>;
  }

  const seats = booking.seats || [];

  return (
    <div className="ticket-wrapper">
      <div className="ticket-card" id="ticket">
        <h1 className="ticket-title">SilverSeats</h1>
        <p className="ticket-subtitle">Movie Ticket</p>

        <hr />

        <p>PVR Cinemas - City Center</p>
        <p>
          123 Laxmi Enclave, Near Gajera Circle,
          Katargam, Surat, Gujarat
        </p>

        <div className="ticket-row">
          <span>Movie</span>
          <span>{booking.movie.title}</span>
        </div>

        <div className="ticket-row">
          <span>Seats</span>
          <span>{seats.join(", ")}</span>
        </div>

        <div className="ticket-row">
          <span>Name</span>
          <span>{booking.buyer?.name}</span>
        </div>

        <div className="ticket-row">
          <span>Mobile</span>
          <span>{booking.buyer?.mobile}</span>
        </div>

        <div className="ticket-row">
          <span>Total Paid</span>
          <span>₹{booking.totalAmount}</span>
        </div>

        <hr />

        <p className="ticket-footer">
          Show this ticket at the theatre entrance
          <br />
          Booking ID: <strong>SS{booking._id}</strong>
        </p>
      </div>

      <button className="print-btn" onClick={() => window.print()}>
        Print Ticket
      </button>
    </div>
  );
};

export default TicketPage;
