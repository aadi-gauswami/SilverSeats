import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { senduserAuthrequest } from "../api-helpers/api-helpers";
import "./style.css";

const LoginPage = () => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!userId || !password) {
      setError("Please enter User ID and Password");
      return;
    }

    try {
      const response = await senduserAuthrequest(
        {
          email: userId,     // assuming login via email or userId
          password: password
        },
        false // login mode
      );

      // ✅ Store authentication details
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userid", response.user._id);
      localStorage.setItem("user", response.user.username);
      localStorage.setItem("token", response.token);

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid login credentials");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="logincard">
        <h2 className="login-brand">SilverSeats</h2>
        <p className="login-tagline1">Welcome Back,</p>
        <p className="login-tagline">
          Book movie tickets instantly. Choose your seat. Enjoy the show.
        </p>

        {error && <p className="error-text">{error}</p>}

        <form className="myform" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email or User ID"
            className="inputgroup"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="inputgroup"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="auth-links">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <button type="submit" className="sub">Login</button>
        </form>

        <p className="register-text">
          Don’t have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
