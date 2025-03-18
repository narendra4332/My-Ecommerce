import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import "./About.css";
import c1 from "../assets/sliderProducts/c1.jpg";
import c2 from "../assets/sliderProducts/c2.jpg";
import c3 from "../assets/sliderProducts/c3.jpg";
import about from "../assets/sliderProducts/about.jpg";

export default function About() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="about-container container">
      {/* About Section */}
      <h1 className="text-center">About SUSCOM Group</h1>
      <div className="about-contener-box">
        <div className="col-md-6 about-text">
          <p>
            SUSCOM Group is a top leading manufacturer, distributor, and
            importer of all types of connectors, cable assemblies, and
            data-signal converters. We are known as a reliable source for
            industrial automation, power electronics solutions, data solutions,
            and tailor-made connectivity solutions. With the best price
            assurance and fastest worldwide delivery, we continue to provide
            cutting-edge solutions for our customers.
          </p>
        </div>
        <div className="col-md-6 about-image">
          <img src={about} alt="SUSCOM Industry" className="img-fluid" />
        </div>
      </div>

      {/* Certificates Section */}
      <div className="certificates-section text-center">
        <h2 className="certificates-title">Certificates</h2>
        <div className="siretificates-container">
          {[c1, c2, c3].map((image, index) => (
            <div
              className="col-md-3 col-sm-6 certificate"
              key={index}
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image}
                alt={`Certificate ${index + 1}`}
                className="img-fluid"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Full-Screen Image */}
      {selectedImage && (
        <div
          className="image-modal d-flex align-items-center justify-content-center"
          onClick={() => setSelectedImage(null)}
        >
          <img src={selectedImage} alt="Full Size" className="modal-image" />
        </div>
      )}
    </div>
  );
}
