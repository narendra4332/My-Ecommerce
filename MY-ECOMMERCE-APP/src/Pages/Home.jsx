// import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { FaArrowRight, FaPhone } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../Firebase";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import s1 from "../assets/s1.jpg";
import s4 from "../assets/s4.jpg";
import s5 from "../assets/s5.png";
import s6 from "../assets/s6.jpg";

import Product from "./Product";

function Home({ HomePageCount }) {
  const whatsappNumber = "6264213443";

  const [products, setProducts] = useState([]);

  // Firestore se products fetch karein
  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "Products"));
      const productsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsArray);
    };
    fetchProducts();
  }, []);
  const homePageData = [
    {
      id: 0,
      image: s1,
      title: "Encoder Cables",
      description:
        "An encoder cable transmits encoder output, which may include multiple channels, to a control device.",
    },
    {
      id: 1,
      image: s4,
      title: "Shielded Multi Core Wires",
      description: "Provides long-distance connectivity.",
    },
    {
      id: 2,
      image: s5,
      title: "Servo Drive System",
      description:
        "Special electronic amplifier used to power electric servomechanisms.",
    },
    {
      id: 3,
      image: s6,
      title: "Heavy Duty Connectors",
      description: "Robot Connectivity.",
    },
  ];
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    cssEase: "ease-in-out",
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div>
      {/* Slideshow Section */}
      <div className="slideshow-container">
        {homePageData
          .filter((item) => item.id === HomePageCount)
          .map((item) => (
            <div key={item.id}>
              <img src={item.image} className="background fade-in" alt="" />
              <div className="text-style">
                <h1>{item.title}</h1>
                <p>{item.description}</p>
                <Link to="/Product">
                  <button>
                    Go to Products <FaArrowRight />
                  </button>
                </Link>
              </div>
            </div>
          ))}
      </div>

      {/* About Section */}
      <div className="container my-5">
        <div className="row justify-content-center text-center">
          <div className="col-lg-8">
            <h1 className="slider-heading">About SUSCOM Group</h1>
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
              <h3 className="fw-bold text-dark">
                Reliable & Advanced Solutions
              </h3>
              <p className="text-muted">
                We are known as a reliable source for industrial automation,
                power electronics, data solutions, and customized connectivity
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
                engineering competence and services. Our product range
                represents cutting-edge technology, and we continuously strive
                to provide the latest solutions and services tailored to market
                needs.
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

        <div className="text-center mt-5 ">
          <a href="/contact" class="About-button">
            Contact Us <FaPhone />
          </a>
        </div>
      </div>
      {/* Why are we different section */}
      <div className="why-different">
        <div>
          <h2 className="slider-heading">Why are we different ?</h2>
          <p>
            Committed to our prestigious clients for the best quality of
            material with competitive pricing and express delivery service.
          </p>
        </div>

        <div className="features-container">
          <div className="feature-box">
            <h4>🏆 Honor</h4>
            <p>Passed CE and ISO 9001-2015 quality systems.</p>
          </div>
          <div className="feature-box">
            <h4>🎨 Customization</h4>
            <p>
              Support full customization based on customer needs and demands.
            </p>
          </div>
          <div className="feature-box">
            <h4>🤝 Support</h4>
            <p>
              Dedicated to customer needs, ensuring quality products and
              assistance in debugging.
            </p>
          </div>
        </div>
      </div>

      {/* ✅ Products Slider Section */}
      <div className="slider-section">
        <h2 className="slider-heading">Our Products</h2>
        <div className="slider-container">
          <Slider {...settings}>
            {products.map((product) => (
              <div className="product-card" key={product.id}>
                <img
                  src={product.ImageURL}
                  alt={product.Name}
                  className="product-image"
                />
                <div className="product-info">
                  <p>{product.Name}</p>
                  <Link to="/Product">
                    <button className="product-button">
                      View More <FaArrowRight />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div>
        {/* WhatsApp Button */}
        <div className="text-center mt-4">
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-success btn-lg whatsapp-button"
          >
            Chat on WhatsApp <FaWhatsapp />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
