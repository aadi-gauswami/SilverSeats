import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getmoviebyid , getReservedSeats } from "../api-helpers/api-helpers";
import "./style1.css";

function BookingPage() {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState();
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    date: "",
    time: "",
  });

  /* ================= FETCH MOVIE ================= */
  useEffect(() => {
    const fetchMovie = async () => {
      const data = await getmoviebyid(movieId);
      setMovie(data.movie);
    };
    fetchMovie();
  }, [movieId]);

  /* ================= SEATS ================= */
  useEffect(() => {
  const rows = ["A", "B", "C", "D", "E"];
  const seatData = [];

  rows.forEach(row => {
    for (let i = 1; i <= 8; i++) {
      seatData.push({
        number: `${row}${i}`,
        status: "empty",
      });
    }
  });

  setSeats(seatData);
}, []);

useEffect(() => {
  if (!formData.date || !formData.time || !movie?._id) return;

  const loadReservedSeats = async () => {
    const reserved = await getReservedSeats(
      movie._id,
      formData.date,
      formData.time
    );

    setSeats(prev =>
      prev.map(seat => ({
        ...seat,
        status: reserved.includes(seat.number)
          ? "reserved"
          : "empty",
      }))
    );
  };

  loadReservedSeats();
}, [formData.date, formData.time, movie]);


  const toggleSeat = (seatNumber, status) => {
    if (status === "reserved") return;
    setSelectedSeats(prev =>
      prev.includes(seatNumber)
        ? prev.filter(s => s !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = e => {
    e.preventDefault();

    if (!formData.date || !formData.time) {
      alert("Please select date and time");
      return;
    }

    const bookingDetails = {
      movie: movie._id,
      movieName: movie.title,
      poster: movie.posterurl,
      pricePerSeat: movie.price,
      seats: selectedSeats,
      date: formData.date,
      time: formData.time,
      buyer: {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        address: formData.address,
      },
      totalAmount: selectedSeats.length * movie.price,
    };


    localStorage.setItem("bookingDetails", JSON.stringify(bookingDetails));
    navigate("/payment", { state: bookingDetails });
  };

  if (!movie) return <p>Loading...</p>;

  return (
    <main className="main">
      <section className="movie-info">
        <img src={movie.posterurl} alt={movie.title} className="poster" />
        <div>
          <h1>{movie.title}</h1>
          <p>{movie.description}</p>
          <p>2h 15m</p>
          <p>Price: ₹{movie.price}</p>
          <strong><h3>Theater Information</h3></strong>
          <p><strong>Name:</strong> PVR Cinemas - City Center</p>
          <p><strong>Address: </strong> 123 Laxmi Enclave, Near Gajera Circle, Katargam, Surat , Gujarat, India</p>
        </div>
      </section>

      <section className="seat-grid">
        {seats.map((seat, i) => (
          <div
            key={i}
            className={`seat ${
              seat.status === "reserved"
                ? "red"
                : selectedSeats.includes(seat.number)
                ? "blue"
                : "white"
            }`}
            onClick={() => toggleSeat(seat.number, seat.status)}
          >
            {seat.number}
          </div>
        ))}
      </section>

      <section className="movie-detail-card">
        <form onSubmit={handleSubmit}>
          <h3>Buyer Information</h3>

          <input name="name" placeholder="Full Name" required onChange={handleChange} />
          <input name="email" type="email" placeholder="Email" required onChange={handleChange} />
          <input name="mobile" placeholder="Mobile" required onChange={handleChange} />
          <textarea name="address" placeholder="Address" required onChange={handleChange} />

          {/* DATE */}
          <input
            type="date"
            name="date"
            min={new Date().toISOString().split("T")[0]}
            required
            onChange={handleChange}
          />

          {/* TIME */}
          <select name="time" required onChange={handleChange}>
            <option value="">Select Time</option>
            <option value="07:00 AM">07:00 AM</option>
            <option value="10:00 AM">10:00 AM</option>
            <option value="04:00 PM">04:00 PM</option>
            <option value="08:00 PM">08:00 PM</option>
          </select>

          <br/>
          <button type="submit">Confirm Booking</button>
        </form>
      </section>
    </main>
  );
}

export default BookingPage;
