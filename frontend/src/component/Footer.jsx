import React from 'react';
import './../pages/style.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div>
          <h4>SilverSeats</h4>
          <p>Book Your favorite movies by some click.</p>
        </div>
        <div>
          <h4>Our Objective</h4>
          <ul>
            
            <li>Now Showing</li>
            <li>Upcoming</li>
            <li>Now Tranding</li>
          </ul>
        </div>
        <div>
          <h4>Contact Us</h4>
          <p>Email: silverseats@gmail.com</p>
          
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2025 SilverSeats | Made with ❤️ | Always Ready
      </div>
    </footer>
  );
}

export default Footer;