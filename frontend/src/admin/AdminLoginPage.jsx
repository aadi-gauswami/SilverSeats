import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { sendadminauth } from "../api-helpers/api-helpers";
import "../pages/style.css";

const AdminLoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter admin email and password");
      return;
    }

    try {
      const response = await sendadminauth({
        email,
        password,
      });

      // ✅ Store admin authentication details
      localStorage.setItem("adminLoggedIn", "true");
      localStorage.setItem("adminid", response.adminId);
      localStorage.setItem("token", response.token);

      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid admin credentials");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="logincard">
        <h2 className="login-brand">SilverSeats</h2>
        <p className="login-tagline1">Admin Panel</p>
        <p className="login-tagline">
          Secure access for administrators only.
        </p>

        {error && <p className="error-text">{error}</p>}

        <form className="myform" onSubmit={handleAdminLogin}>
          <input
            type="email"
            placeholder="Admin Email"
            className="inputgroup"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="inputgroup"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="sub">
            Login as Admin
          </button>
        </form>

        <p className="register-text">
          Back to <Link to="/login">User Login</Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLoginPage;
