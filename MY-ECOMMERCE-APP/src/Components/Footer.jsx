import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container">
        <div className="row">
          {/* Company Info */}
          <div className="col-md-4 mb-3">
            <h5>
              SUSCOM <br /> ELECTROMECHANICAL PVT. LTD.
            </h5>
            <p>
              Delivering quality electromechanical solutions with innovation and
              excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-light text-decoration-none">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/About" className="text-light text-decoration-none">
                  About
                </Link>
              </li>
              <li>
                <Link to="/Product" className="text-light text-decoration-none">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/Contact" className="text-light text-decoration-none">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info & Social Media */}
          <div className="col-md-4 mb-3">
            <h5>Contact Us</h5>
            <p>
              Plot No. 20,1st floor, Pitambara Tower, Ahinsha Vihar, Narela
              Jode, Ayodhya Bypass, Bhopal, M.P. - 462041
            </p>
            <p>Email : info@suscom.in</p>
            <p>Phone : +91 769 745 1009</p>

            <div>
              <a href="#" className="text-light me-3">
                Facebook<i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-light me-3">
                <i className="fab fa-twitter"></i>Twitter
              </a>
              <a href="#" className="text-light me-3">
                <i className="fab fa-linkedin-in"></i>Linkedin
              </a>
            </div>
          </div>
        </div>
        <hr className="border-light" />
        <p className="text-center mb-0">
          &copy; 2025 SUSCOM ELECTROMECHANICAL PVT. LTD. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
