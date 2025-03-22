import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import "./About.css";
import c1 from "../../assets/sliderProducts/c1.jpg";
import c2 from "../../assets/sliderProducts/c2.jpg";
import c3 from "../../assets/sliderProducts/c3.jpg";
import about from "../../assets/sliderProducts/about.jpg";

export default function About() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="about-container container">
      {/* About Section */}
      <div className="row align-items-center g-3  flex-column flex-md-row p-4 rounded-3 shadow-lg bg-light text-white text-center">
        <h1 className="text-center fw-bold"> 🏭 About SUSCOM Group 🔌</h1>
        <div className="col-md-7 text-md-start text-center p-5 border rounded-3 shadow-sm bg-light">
          <p className="text-muted">
            SUSCOM Group is a top leading manufacturer, distributor, and
            importer of all types of connectors, cable assemblies, and
            data-signal converters. We are known as a reliable source for
            industrial automation, power electronics solutions, data solutions,
            and tailor-made connectivity solutions. With the best price
            assurance and fastest worldwide delivery, we continue to provide
            cutting-edge solutions for our customers.
          </p>
        </div>
        <div className="col-md-5 text-center">
          <img src={about} alt="SUSCOM Industry" className="img-fluid" />
        </div>
      </div>

      {/* Certificates Section */}
      <div className="certificates-section text-center p-4 mt-5 rounded-3 shadow-lg bg-dark text-white text-center">
        <h2 className="text-center fw-bold certificates-title">
          🎖️ Certificates 📜
        </h2>
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
