import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light py-5">
      <div className="container">
        <div className="row text-md-start">
          {/* Company Info */}
          <div className="col-md-4 mb-4">
            <h5 className="footer-title">
              <i className="bi bi-building me-2"></i> SUSCOM ELECTROMECHANICAL
              PVT. LTD.
            </h5>
            <p className="footer-text">
              Delivering quality electromechanical solutions with innovation and
              excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h5 className="footer-title">
              <i className="bi bi-link-45deg me-2"></i> Quick Links
            </h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="footer-link">
                  <i className="bi bi-house-door me-2"></i> Home
                </Link>
              </li>
              <li>
                <Link to="/About" className="footer-link">
                  <i className="bi bi-info-circle me-2"></i> About
                </Link>
              </li>
              <li>
                <Link to="/Product" className="footer-link">
                  <i className="bi bi-box-seam me-2"></i> Products
                </Link>
              </li>
              <li>
                <Link to="/Contact" className="footer-link">
                  <i className="bi bi-telephone me-2"></i> Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info & Social Media */}
          <div className="col-md-4 mb-4">
            <h5 className="footer-title">
              <i className="bi bi-telephone me-2"></i> Contact Us
            </h5>
            <p className="footer-text">
              <i className="bi bi-geo-alt me-2"></i> Kejra Bhanpur, Maholi,
              Bhopal (M.P.) - 462041
            </p>
            <p className="footer-text">
              <i className="bi bi-envelope me-2"></i> info@suscomagro.com
            </p>
            <p className="footer-text">
              <i className="bi bi-phone me-2"></i> +91 769 745 1009
            </p>

            {/* Social Icons */}
            <div className="d-flex justify-content-md-start">
              <a href="#" className="footer-icon">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="footer-icon">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="#" className="footer-icon">
                <i className="bi bi-twitter"></i>
              </a>
            </div>
          </div>
        </div>

        <hr className="border-light" />
        <p className="text-center footer-bottom">
          &copy; 2025 SUSCOM ELECTROMECHANICAL PVT. LTD. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
