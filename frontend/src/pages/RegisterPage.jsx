import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { senduserAuthrequest } from "../api-helpers/api-helpers";
import "./style.css";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    mobileno: "",
    age: "",
    gender: "",
    address: "",
    password: "",
    confirmpassword: "",
    secretkey: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    const {
      username,
      email,
      mobileno,
      age,
      gender,
      address,
      password,
      confirmpassword,
      secretkey,
    } = inputs;

    // Empty validation
    if (
      !username ||
      !email ||
      !mobileno ||
      !age ||
      !gender ||
      !address ||
      !password ||
      !confirmpassword ||
      !secretkey
    ) {
      setError("All fields are required");
      return;
    }

    // Mobile validation
    if (!/^\d{10}$/.test(mobileno)) {
      setError("Mobile number must be 10 digits");
      return;
    }

    // Age validation
    if (parseInt(age) < 18) {
      setError("Age must be 18 or above");
      return;
    }

    // Password match validation
    if (password !== confirmpassword) {
      setError("Password and Confirm Password do not match");
      return;
    }

    try {
      await senduserAuthrequest(
        {
          username,
          email,
          password,
          mobileno,
          age,
          gender,
          address,
          secretkey,
        },
        true // signup mode
      );

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="logincard">
        <h2 className="login-brand">SilverSeats</h2>
        <p className="login-tagline1">Create Account</p>
        <p className="login-tagline">
          Join SilverSeats and book your movie tickets instantly.
        </p>

        {error && <p className="error-text">{error}</p>}

        <form className="myform" onSubmit={handleRegister}>
          <input
            type="text"
            name="username"
            placeholder="Full Name"
            className="inputgroup"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="inputgroup"
            onChange={handleChange}
          />

          <input
            type="text"
            name="mobileno"
            placeholder="Mobile Number"
            className="inputgroup"
            onChange={handleChange}
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            className="inputgroup"
            onChange={handleChange}
          />

          <select
            name="gender"
            className="inputgroup"
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <textarea
            name="address"
            placeholder="Address"
            className="inputgroup"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="inputgroup"
            onChange={handleChange}
          />

          <input
            type="password"
            name="confirmpassword"
            placeholder="Confirm Password"
            className="inputgroup"
            onChange={handleChange}
          />

          <input
            type="text"
            name="secretkey"
            placeholder="Secret Key (Remember this)"
            className="inputgroup"
            onChange={handleChange}
          />

          <button type="submit" className="sub">Register</button>
        </form>

        <p className="register-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
