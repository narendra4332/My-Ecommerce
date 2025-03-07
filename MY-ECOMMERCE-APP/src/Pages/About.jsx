import React, { useState } from "react";
import "./About.css"; // Make sure to link the CSS file
import c1 from "../assets/sliderProducts/c1.jpg";
import c2 from "../assets/sliderProducts/c2.jpg";
import c3 from "../assets/sliderProducts/c3.jpg";
import about from "../assets/sliderProducts/about.jpg";

export default function About() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="about-container">
      {/* About Section */}
      <h1>About SUSCOM Group</h1>
      <div className="about-content">
        <div className="about-text">
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
        <div className="about-image">
          <img src={about} alt="SUSCOM Industry" />
        </div>
      </div>

      {/* Certificates Section */}
      <div className="certificates-section">
        <h2 className="certificates-title">Certificates</h2>
        <div className="certificates-container">
          {[c1, c2, c3].map((image, index) => (
            <div
              className="certificate"
              key={index}
              onClick={() => setSelectedImage(image)}
            >
              <img src={image} alt={`Certificate ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Full-Screen Image */}
      {selectedImage && (
        <div className="image-modal" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Full Size" className="modal-image" />
        </div>
      )}
    </div>
  );
}
