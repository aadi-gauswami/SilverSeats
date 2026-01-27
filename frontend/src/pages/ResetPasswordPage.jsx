import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../api-helpers/api-helpers";
import "./style.css";

const ResetPasswordPage = () => {
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");

    if (!newPassword || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const userId = localStorage.getItem("resetUserId");

    if (!userId) {
      setError("Session expired. Please verify again.");
      return;
    }

    try {
      setLoading(true);

      await resetPassword(userId, newPassword);

      localStorage.removeItem("resetUserId");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="logincard">
        <h2 className="login-brand">SilverSeats</h2>
        <p className="login-tagline1">Reset Password</p>
        <p className="login-tagline">
          Create a new password for your account.
        </p>

        {error && <p className="error-text">{error}</p>}

        <form className="myform" onSubmit={handleReset}>
          <input
            type="password"
            placeholder="New Password"
            className="inputgroup"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="inputgroup"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button type="submit" className="sub" disabled={loading}>
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
