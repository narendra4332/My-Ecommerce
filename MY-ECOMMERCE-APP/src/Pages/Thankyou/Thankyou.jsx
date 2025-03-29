import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import "./ThankYou.css"; // Ensure CSS file is linked

function ThankYou() {
  const location = useLocation();
  const userName = location.state?.userName;
  return (
    <div className="thank-you-container">
      <div className="thank-you-card">
        <img
          src="https://cdn-icons-png.flaticon.com/512/845/845646.png"
          alt="Success"
          className="thank-you-icon"
        />
        <h1>🎉 Thank You, {userName}! Your Inquiry is Received 🎉</h1>
        <p>
          We truly appreciate your interest! Our team is already reviewing your
          request, and we'll get in touch with you shortly.
        </p>
        <p>
          If you have any urgent queries, feel free to{" "}
          <span className="Contact">
            <Link to="/Contact"> reach out </Link>
          </span>
          . Have a wonderful day! 😊
        </p>
        <Link to="/" className="back-home-btn">
          <FaHome className="home-icon" /> Back to Home
        </Link>
      </div>
    </div>
  );
}

export default ThankYou;
