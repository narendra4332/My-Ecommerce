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
  FaComments,
} from "react-icons/fa";

export default function Header({ cart, handleLogout, userRole }) {
  const location = useLocation(); // Get current route path

  return (
    <nav className="navbar navbar-expand-lg bg-light py-2 fixed-top shadow-sm">
      <div className="container-fluid">
        {/* Brand Logo */}
        <a className="navbar-brand" href="/">
          <span className="brand-name">Suscom</span>
          <span className="brand-sub">Electromechanical Pvt. Ltd.</span>
        </a>

        {/* Navbar Toggler (Mobile View) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
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

            {/* ✅ Orders tab sirf admin ke liye dikhayein */}
            {userRole === "admin" && (
              <li className="nav-item px-3">
                <Link
                  className={`nav-link text-dark ${
                    location.pathname === "/Orders" ? "active" : ""
                  }`}
                  to="/Orders"
                >
                  <FaComments className="me-1" /> Inquiries
                </Link>
              </li>
            )}

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
          <div className="button-dox">
            <Link
              className="btn btn-sm m-0 d-flex align-items-center me-1 cart-btn"
              to="/Cart"
            >
              <FaShoppingCart className="me-1 mt-1" /> Inquiry Cart (
              {cart.length})
            </Link>
            {cart.length > 0 && (
              <Link
                className="btn btn-outline-success m-0 btn-sm d-flex align-items-center me-2 center-btn"
                to="/Checkout"
              >
                ✅ Checkout
              </Link>
            )}
            <button
              className="btn btn-outline-danger m-0 btn-sm d-flex align-items-center center-btn"
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
