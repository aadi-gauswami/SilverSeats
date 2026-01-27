// src/component/Header.js

import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './../pages/style.css';

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    navigate('/login');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="logo , login-brand">SilverSeats</div>
      <ul className="nav-links">
        <li>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
        </li>
        <li>
          <Link to="/movies" className={location.pathname === '/movies' ? 'active' : ''}>Movies</Link>
        </li>
        <li>
          <Link to="/my-bookings" className={location.pathname === '/my-bookings' ? 'active' : ''}>My Bookings</Link>
        </li>
        <li>
          <Link to="/support" className={location.pathname === '/support' ? 'active' : ''}>Support</Link>
        </li>
        <li>
          <div className="card"><button className="logout-btn" onClick={handleLogout}>Logout</button></div>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
