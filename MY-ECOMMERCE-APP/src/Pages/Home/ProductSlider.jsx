import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Style/ProductSlider.css";

function ProductSlider({ products }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    arrows: true,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3, arrows: false } },
      { breakpoint: 992, settings: { slidesToShow: 2, arrows: false } },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, arrows: false, dots: true },
      },
    ],
  };

  const showProduct = products.slice(0, 5);

  return (
    <div className="slider-section container py-5">
      <h2 className="text-center fw-bold text-dark mb-4">✨ Our Products ✨</h2>
      <Slider {...settings} className="product-slider">
        {showProduct.map((product) => (
          <div className="product-card shadow-lg rounded" key={product.id}>
            <img
              src={product.ImageURL}
              alt={product.Name}
              className="product-image rounded-top img-fluid"
            />
            <div className="product-info text-center p-1">
              <p className="fw-bold mb-2 text-dark">{product.Name}</p>
              <Link to="/Product">
                <button className="product-button btn btn-dark px-4 py-2 shadow">
                  View More <FaArrowRight className="ms-2" />
                </button>
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ProductSlider;
