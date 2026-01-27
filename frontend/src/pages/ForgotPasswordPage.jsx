import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyUser } from "../api-helpers/api-helpers";
import "./style.css";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");

    if (!userId || !secretKey) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await verifyUser(userId, secretKey);

      localStorage.setItem("resetUserId", res.userId);
      navigate("/reset-password");

    } catch (err) {
      setError(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="login-wrapper">
      <div className="logincard">
        <h2 className="login-brand">SilverSeats</h2>
        <p className="login-tagline1">Verify Identity</p>
        <p className="login-tagline">
          Enter your User ID and Secret Key to reset your password.
        </p>

        {error && <p className="error-text">{error}</p>}

        <form className="myform" onSubmit={handleVerify}>
          <input
            type="text"
            placeholder="User ID"
            className="inputgroup"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />

          <input
            type="text"
            placeholder="Secret Key"
            className="inputgroup"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
          />

          <button type="submit" className="sub" disabled={loading}>
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
