import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

import {
  getallmovie,
  getAllUsers,
  getAllBookings,
} from "../api-helpers/api-helpers";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

const DashboardPage = () => {
  const [movies, setMovies] = useState([]);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);

  

  useEffect(() => {
    const fetchDashboardData = async () => {
      const movieData = await getallmovie();
      const userData = await getAllUsers();
      const bookingData = await getAllBookings();

      setMovies(movieData?.movies || movieData || []);
      setUsers(userData?.users || userData || []);
      setBookings(bookingData?.bookings || bookingData || []);
    };

    fetchDashboardData();
  }, []);

  /* STATIC GRAPH DATA (can be dynamic later) */
  const getBookingGraphData = (bookings) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const counts = Array(7).fill(0);

    bookings.forEach((booking) => {
      const dayIndex = new Date(booking.createdAt).getDay();
      counts[dayIndex]++;
    });

    return {
      labels: days,
      datasets: [
        {
          label: "Tickets Booked",
          data: counts,
          backgroundColor: "#ffd200",
        },
      ],
    };
  };


  const getUserGraphData = (users) => {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const counts = Array(12).fill(0);

    users.forEach((user) => {
      const monthIndex = new Date(user.createdAt).getMonth();
      counts[monthIndex]++;
    });

    return {
      labels: months,
      datasets: [
        {
          label: "User Registrations",
          data: counts,
          borderColor: "#ffd200",
          backgroundColor: "rgba(255,210,0,0.2)",
          tension: 0.4,
        },
      ],
    };
  };


  const options = {
    responsive: true,
    plugins: {
      legend: { labels: { color: "#fff" } },
    },
    scales: {
      x: {
        ticks: { color: "#fff" },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
      y: {
        ticks: { color: "#fff" },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
    },
  };

  const bookingGraph = getBookingGraphData(bookings);
const userGraph = getUserGraphData(users);


  return (
    <div className="maingrid">
      <h1>Admin Dashboard</h1>

      {/* SUMMARY CARDS */}
      <div className="dashboard-cards">
        <div className="dash-card">Movies<br />{movies.length}</div>
        <div className="dash-card">Users<br />{users.length}</div>
        <div className="dash-card">Bookings<br />{bookings.length}</div>
      </div>

      {/* CHARTS */}
      <div className="graph-section">
        <div className="graph-card">
          <h3>Ticket Booking Overview</h3>
          <Bar data={bookingGraph} options={options} />
        </div>

        <div className="graph-card">
          <h3>User Registration Trend</h3>
          <Line data={userGraph} options={options} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
