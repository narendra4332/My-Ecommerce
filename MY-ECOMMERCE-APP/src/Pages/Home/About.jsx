import React from "react";
import { FaPhone } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./Style/About.css";

function About() {
  const navigate = useNavigate();

  return (
    <div className="container my-5">
      {/* About Section */}
      <div className="text-center mb-5">
        <h1 className="display fw-bold text-dark">
          <i className="bi bi-rocket-takeoff-fill me-2"></i> About SUSCOM Group
        </h1>
        <p className="lead text-muted mx-auto w-75">
          We are pioneers in manufacturing, distributing, and importing
          high-quality connectors, cable assemblies, and data-signal converters.
        </p>
      </div>

      {/* Image & Text Row */}
      <div className="row align-items-center g-4">
        <div className="col-md-6 text-center">
          <img
            src="src\assets\How-to-ensure-quality-and-reliability-as-cable-assembly.png"
            alt="SUSCOM Industry"
            className="img-fluid rounded-3 shadow-sm"
          />
        </div>
        <div className="col-md-6 text-md-start text-center p-4 border rounded-3 shadow-sm bg-light">
          <h3 className="fw-bold heading-color">
            Reliable & Advanced Solutions
          </h3>
          <p className="text-muted">
            From industrial automation to customized connectivity solutions, we
            provide top-tier quality with express worldwide delivery—ensuring
            seamless integration and unmatched reliability for your business.
          </p>
        </div>
      </div>

      {/* Vision Section */}
      <div className="row align-items-center g-4 mt-5 flex-column-reverse flex-md-row">
        <div className="col-md-6 text-md-start text-center p-4 border rounded-3 shadow-sm bg-light">
          <h3 className="fw-bold heading-color">Our Vision</h3>
          <p className="text-muted">
            To set new benchmarks in the cable industry by delivering
            high-performance, reliable, and future-ready connectivity solutions
            that empower businesses with seamless efficiency and unmatched
            durability. With a commitment to innovation and precision
            engineering, we ensure our solutions exceed industry standards and
            drive technological excellence.
          </p>
        </div>
        <div className="col-md-6 text-center">
          <img
            src="src\assets\Cable-and-wire-industry.gif"
            alt="Our Vision"
            className="img-fluid rounded-3 shadow-sm"
          />
        </div>
      </div>

      {/* Contact Button */}
      <div className="text-center mt-5">
        <button
          onClick={() => navigate("/Contact")}
          className="btn btn-dark btn-lg px-4 py-2 shadow"
        >
          Contact Us <FaPhone className="ms-2" />
        </button>
      </div>

      {/* Why Different Section */}
      <div className="p-5 mt-5 rounded-3 shadow-lg bg-dark text-white text-center">
        <h2 className="fw-bold">
          <i className="bi bi-question-circle-fill me-2"></i> Why Are We
          Different?
        </h2>
        <p>
          We commit to providing the best quality materials with competitive
          pricing and express delivery service.
        </p>

        <div className="row mt-4 g-4">
          <div className="col-md-4">
            <div className="p-4 border rounded-3 shadow-sm bg-light text-dark feature-box">
              <h4 className="heading-color">
                <i className="bi bi-check-circle-fill me-2"></i> Certified
                Excellence
              </h4>
              <p>ISO 9001-2015 and CE certified quality systems.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 border rounded-3 shadow-sm bg-light text-dark feature-box">
              <h4 className="heading-color">
                <i className="bi bi-tools me-2"></i> Tailored Solutions
              </h4>
              <p>We offer full customization to meet client needs.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 border rounded-3 shadow-sm bg-light text-dark feature-box">
              <h4 className="heading-color">
                <i className="bi bi-headset me-2"></i> Exceptional Support
              </h4>
              <p>Guaranteed quality products with expert assistance.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
