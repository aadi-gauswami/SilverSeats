import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./admin.css";

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear admin auth
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("adminid");
    localStorage.removeItem("token");

    navigate("/admin/login");
  };

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <h2>SilverSeats Admin</h2>

        <nav className="admin-nav">
          <NavLink to="/admin/dashboard">Dashboard</NavLink>
          <NavLink to="/admin/movies">Movies</NavLink>
          <NavLink to="/admin/users">Users</NavLink>
          <NavLink to="/admin/bookings">Bookings</NavLink>
        </nav>

        {/* LOGOUT BUTTON */}
        <button className="admin-logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
