import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./About.css";
// import about from "../../assets/sliderProducts/about.jpg";
import c1 from "../../assets/sliderProducts/c1.jpg";
import c2 from "../../assets/sliderProducts/c2.jpg";
import c3 from "../../assets/sliderProducts/c3.jpg";

export default function About() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div
      className="about-container container py-5"
      style={{ marginTop: "60px" }}
    >
      {/* SUSCOM GROUP Section */}
      <div className="section-container  mb-4 rounded-3 shadow-lg bg-light text-dark text-center">
        <h2
          className="fw-bold my-Color1"
          style={{
            color: "var( --my-Color1,)",
          }}
        >
          <i className="bi bi-gear-fill me-2"></i> SUSCOM GROUP
        </h2>
        <p className="text-muted">
          SUSCOM GROUP is a leading manufacturer, distributor, and importer of
          cable assemblies, connectors, data-signal converters, and more. We
          provide reliable industrial automation, power electronics solutions,
          and custom connectivity solutions with the best price assurance and
          fastest delivery.
        </p>
      </div>

      {/* SUSCOM AGRO FOODS Section */}
      <div className="section-container p-5 mb-4 rounded-3 shadow-lg bg-white text-dark text-center">
        <h3 className="fw-bold text-warning">
          <i className="bi bi-tree-fill me-2"></i> SUSCOM AGRO FOODS
        </h3>
        <p className="text-muted">
          SUSCOM AGRO FOODS is a startup dedicated to high-quality agro products
          under the brand <strong>MAGADH</strong>. Established in 2018, we
          ensure hygienic processing and premium quality for our customers.
        </p>
      </div>

      {/* SITS APP COMMUNICATIONS Section */}
      <div className="section-container p-5 mb-4 rounded-3 shadow-lg bg-light text-dark text-center">
        <h3 className="fw-bold text-success">
          <i className="bi bi-laptop me-2"></i> SITS APP COMMUNICATIONS
        </h3>
        <p className="text-muted">
          SITS APP COMMUNICATIONS, a part of SUSCOM GROUP, specializes in
          software, mobile apps, and web development. We focus on innovation,
          creativity, and cutting-edge technology to provide the best business
          solutions.
        </p>
      </div>

      {/* Certificates Section */}
      <div className="certificates-section text-center p-4 mt-5 rounded-3 shadow-lg bg-white">
        <h2 className="fw-bold text-dark p-4">
          <i className="bi bi-award-fill"></i> OUR CERTIFICATES
          <i className="bi bi-file-earmark-text-fill ms-2"></i>
        </h2>
        <div className="certificates-container d-flex justify-content-center gap-4 flex-wrap">
          {[c1, c2, c3].map((image, index) => (
            <div
              className="certificate-item p-1 bg-dark rounded-3 shadow-sm"
              key={index}
              onClick={() => setSelectedImage(image)}
              style={{ width: "200px", cursor: "pointer" }}
            >
              <img
                src={image}
                alt={`Certificate ${index + 1}`}
                className="img-fluid rounded"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Full-Screen Image */}
      {selectedImage && (
        <div
          className="image-modal d-flex align-items-center justify-content-center mt-5"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Full Size"
            className="modal-image rounded-3 shadow-lg"
          />
        </div>
      )}
    </div>
  );
}
