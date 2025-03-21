import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import "./ThankYou.css"; // Ensure CSS file is linked

function ThankYou() {
  return (
    <div className="thank-you-container">
      <div className="thank-you-card">
        <img
          src="https://cdn-icons-png.flaticon.com/512/845/845646.png"
          alt="Success"
          className="thank-you-icon"
        />
        <h1>📩 Thank You for Your Inquiry! 📩</h1>
        <p>
          We have received your inquiry and will get back to you as soon as
          possible. Our team will review your request and respond shortly. Stay
          tuned!
        </p>
        <Link to="/" className="back-home-btn">
          <FaHome className="home-icon" /> Back to Home
        </Link>
      </div>
    </div>
  );
}

export default ThankYou;
