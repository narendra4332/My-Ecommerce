import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import {
  FaShoppingCart,
  FaUser,
  FaHome,
  FaInfoCircle,
  FaBoxOpen,
  FaPhoneAlt,
} from "react-icons/fa";

export default function Header({ cart, handleLogout }) {
  const location = useLocation(); // Get current route path

  return (
    <nav className="navbar navbar-expand-lg bg-light  py-2 fixed-top">
      <div className="container-fluid">
        {/* Brand Logo */}
        <a className="navbar-brand px-3" href="/">
          Suscom <br /> Electromechnical Pvt. Ltd.
        </a>

        {/* Navbar Toggler (Mobile View) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          style={{ marginLeft: "10px" }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNav"
        >
          <ul className="navbar-nav mx-auto">
            <li className="nav-item px-3">
              <Link
                className={`nav-link text-dark ${
                  location.pathname === "/" ? "active" : ""
                }`}
                to="/"
              >
                <FaHome className="me-1" /> Home
              </Link>
            </li>
            <li className="nav-item px-3">
              <Link
                className={`nav-link text-dark ${
                  location.pathname === "/About" ? "active" : ""
                }`}
                to="/About"
              >
                <FaInfoCircle className="me-1" /> About
              </Link>
            </li>
            <li className="nav-item px-3">
              <Link
                className={`nav-link text-dark ${
                  location.pathname === "/Product" ? "active" : ""
                }`}
                to="/Product"
              >
                <FaBoxOpen className="me-1" /> Products
              </Link>
            </li>
            <li className="nav-item px-3">
              <Link
                className={`nav-link text-dark ${
                  location.pathname === "/Contact" ? "active" : ""
                }`}
                to="/Contact"
              >
                <FaPhoneAlt className="me-1" /> Contact Us
              </Link>
            </li>
          </ul>

          {/* Cart & Logout Section */}
          <div className="d-flex align-items-center me-3">
            <Link
              className="btn btn-outline-primary btn-sm d-flex align-items-center me-1"
              to="/Cart"
            >
              <FaShoppingCart className="me-1" /> Cart ({cart.length})
            </Link>
            {cart.length > 0 && (
              <Link
                className="btn btn-success btn-sm d-flex align-items-center me-2"
                to="/Checkout"
              >
                ✅ Checkout
              </Link>
            )}
            <button
              className="btn btn-outline-danger btn-sm d-flex align-items-center"
              onClick={handleLogout}
            >
              <FaUser className="me-1" /> Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
