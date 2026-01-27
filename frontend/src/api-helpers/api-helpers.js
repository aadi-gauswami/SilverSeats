import axios from "axios";
import { backendurl } from "../config";

export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${backendurl}/user`);
    return res.data;
  } catch (err) {
    console.error("❌ Error fetching users:", err.message);
    return null;
  }
};

export const verifyUser = async (email, secretkey) => {
  const res = await axios.post(`${backendurl}/user/verify`, {
    email,
    secretkey,
  });
  return res.data;
};

export const resetPassword = async (userId, newPassword) => {
  const res = await axios.post(`${backendurl}/user/reset-password`, {
    userId,
    newPassword,
  });
  return res.data;
};


// USER AUTHENTICATION
export const senduserAuthrequest = async (inputs, signup) => {
  try {
    const res = await axios.post(
      `${backendurl}/user${signup ? "/signup" : "/login"}`,
      {
        username: signup ? inputs.username : undefined,
        email: inputs.email,
        password: inputs.password,
        mobileno: inputs.mobileno,
        age: inputs.age,
        gender: inputs.gender,
        address: inputs.address,
        secretkey: inputs.secretkey,
      }
    );
    return res.data;
  } catch (err) {
    const errorMessage =
      err && err.response && err.response.data
        ? err.response.data
        : err.message || "Unknown error occurred";
    console.error("❌ API error:", errorMessage);
    throw err;
  }
};

// ADMIN AUTHENTICATION
export const sendadminauth = async (data) => {
  try {
    const res = await axios.post(`${backendurl}/admin/login`, {
      email: data.email,
      password: data.password,
    });

    return res.data;
  } catch (err) {
    console.error("❌ Admin login failed:", err.response?.data || err.message);
    throw err;
  }
};

// MOVIES
export const getallmovie = async () => {
  try {
    const res = await axios.get(`${backendurl}/movie`);
    return res.data;
  } catch (err) {
    console.error("❌ Error fetching movies:", err.message);
    return null;
  }
};

export const getmoviebyid = async (id) => {
  try {
    const res = await axios.get(`${backendurl}/movie/${id}`);
    return res.data;
  } catch (err) {
    console.error("❌ Error fetching movie by id:", err.message);
    return null;
  }
};

// BOOKINGS
export const newbooking = async (data) => {
  try {
    const res = await axios.post(`${backendurl}/booking`, data);
    return res.data;
  } catch (err) {
    console.error("❌ Booking failed:", err.response?.data || err.message);
    throw err;
  }
};


export const updateBooking = async (id, data) => {
  try {
    const res = await axios.patch(`${backendurl}/booking/${id}`, data);
    return res.data;
  } catch (err) {
    console.error("❌ Update booking failed:", err.response?.data || err.message);
    return null;
  }
};

export const deleteBooking = async (id) => {
  try {
    const res = await axios.delete(`${backendurl}/booking/delete/${id}`);
    return res.data;
  } catch (err) {
    console.error("❌ Delete booking failed:", err.response?.data || err.message);
    return null;
  }
};

export const getAllBookings = async () => {
  try {
    const res = await axios.get(`${backendurl}/booking`);
    return res.data;
  } catch (err) {
    console.error("❌ Error fetching bookings:", err.message);
    return [];
  }
};

export const getBookingsByUser = async (userId) => {
  try {
    const res = await axios.get(`${backendurl}/booking/user/${userId}`);
    return res.data;
  } catch (err) {
    console.error("❌ Error fetching user bookings:", err.message);
    return [];
  }
};

export const getReservedSeats = async (movieId, date, time) => {
  try {
    const res = await axios.get(
      `${backendurl}/booking/reserved-seats`,
      { params: { movieId, date, time } }
    );
    return res.data.reservedSeats;
  } catch (err) {
    console.error("❌ Error fetching reserved seats", err.message);
    return [];
  }
};


// ADD MOVIES
export const addmovie = async (data) => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Admin not logged in!");
    return;
  }

  try {
    const res = await axios.post(
      `${backendurl}/movie`,
      {
        title: data.title,
        description: data.description,
        releaseDate: data.releaseDate,
        posterurl: data.posterurl,
        price: data.price,
        featured: data.featured,
        actors: data.actors,
        admin: localStorage.getItem("adminid"),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (err) {
    console.error("❌ Add movie failed:", err.response?.data || err.message);
    throw err;
  }
};

// UPDATE MOVIES

export const updateMovie = async (id, data) => {
  const res = await axios.patch(`${backendurl}/movie/${id}`, data);
  return res.data;
};

// DELETE MOVIES

export const deleteMovie = async (id) => {
  const res = await axios.delete(`${backendurl}/movie/${id}`);
  return res.data;
};
