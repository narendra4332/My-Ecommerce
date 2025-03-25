import React from "react";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaClock,
} from "react-icons/fa";
// import { motion } from "framer-motion";
import "./Contact.css"; // Import the CSS file

export default function Contact() {
  return (
    <div className="contact-container">
      <div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="contact-card"
      >
        <div>
          <h2 className="contact-heading">
            <i className="bi bi-telephone-fill me-2"></i> Contact Us{" "}
            <i className="bi bi-envelope-fill ms-2"></i>
          </h2>

          <p className="contact-subtext">
            Reach out to the right department for quick assistance.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-box">
            <h3>Info</h3>
            <p>
              <i className="bi bi-envelope-fill me-2"></i> info@suscom.in
            </p>
            <p>
              <i className="bi bi-telephone-fill me-2"></i> +91 769 745 1009
            </p>
          </div>
          <div className="contact-box">
            <h3>Dispatch</h3>
            <p>
              <i className="bi bi-envelope-fill me-2"></i> dispatch@suscom.in
            </p>
            <p>
              <i className="bi bi-telephone-fill me-2"></i> +91 882 762 9301
            </p>
          </div>
          <div className="contact-box">
            <h3>Marketing</h3>
            <p>
              <i className="bi bi-envelope-fill me-2"></i> marketing@suscom.in
            </p>
            <p>
              <i className="bi bi-telephone-fill me-2"></i> +91 808 765 9549
            </p>
          </div>
          <div className="contact-box">
            <h3>Landline</h3>
            <p>
              <i className="bi bi-telephone-fill me-2"></i> +91 755 492 5469
            </p>
          </div>
        </div>

        <div className="contact-info">
          <h3>Contact Information</h3>
          <p>
            <i className="bi bi-geo-alt-fill me-2"></i>
            Plot No. 20, 1st floor, Pitambara Tower, Ahinsha Vihar, Narela Jode,
            Ayodhya Bypass, Bhopal, M.P. - 462041
          </p>

          <p>
            <i className="bi bi-telephone-fill me-2"></i> +91 769 745 1009
          </p>

          <p>
            <i className="bi bi-envelope-fill me-2"></i> info@suscom.in
          </p>

          <p>
            <i className="bi bi-clock-fill me-2"></i> Office Timing: Mon - Sat,
            9:30 AM - 6:30 PM
          </p>
        </div>
      </div>
    </div>
  );
}
