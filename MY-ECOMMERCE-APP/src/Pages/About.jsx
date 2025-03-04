import React from "react";

export default function About() {
  return (
    <div className="container my-5">
      <div className="row justify-content-center text-center">
        <div className="col-lg-8">
          <h1 className="fw-bold text-primary mb-3">About SUSCOM Group</h1>
          <p className="lead text-muted">
            SUSCOM Group is a top leading manufacturer, distributor, and
            importer of all types of connectors, cable assembly, data-signal
            converters, and more.
          </p>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-6">
          <img
            src="src\assets\sliderProducts\industry.avif"
            alt="SUSCOM Industry"
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6 d-flex align-items-center">
          <div>
            <h3 className="fw-bold text-dark">Reliable & Advanced Solutions</h3>
            <p className="text-muted">
              We are known as a reliable source for industrial automation, power
              electronics, data solutions, and customized connectivity
              solutions. Our expertise includes power cables, encoder cables,
              interface cables, CNC cables, and tailor-made solutions with the
              best price assurance and fastest worldwide delivery.
            </p>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-6 d-flex align-items-center">
          <div>
            <h3 className="fw-bold text-dark">Our Vision</h3>
            <p className="text-muted">
              As a rapidly growing industry, we are a leading manufacturer of
              standardized and custom cables, supported by top-tier industrial
              engineering competence and services. Our product range represents
              cutting-edge technology, and we continuously strive to provide the
              latest solutions and services tailored to market needs.
            </p>
          </div>
        </div>
        <div className="col-md-6">
          <img
            src="src\assets\sliderProducts\vision.webp"
            alt="Our Vision"
            className="img-fluid rounded shadow"
          />
        </div>
      </div>

      <div className="text-center mt-5">
        <a href="/contact" className="btn btn-primary btn-lg">
          Contact Us
        </a>
      </div>
    </div>
  );
}
