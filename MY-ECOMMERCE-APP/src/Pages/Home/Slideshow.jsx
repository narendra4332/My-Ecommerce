import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import s1 from "../../assets/s1.jpg";
import s4 from "../../assets/s4.jpg";
import s5 from "../../assets/s5.png";
import s6 from "../../assets/s6.jpg";
import "./Style/Slideshow.css"; // Importing the updated CSS file

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

function Slideshow({ HomePageCount }) {
  return (
    <div className="slideshow-container">
      {homePageData
        .filter((item) => item.id === HomePageCount)
        .map((item) => (
          <div key={item.id} className="slide fade-in">
            <img src={item.image} className="background" alt={item.title} />
            <div className="text-style">
              <h1>{item.title}</h1>
              <p>{item.description}</p>
              <Link to="/Product">
                <button className="slide-button">
                  Go to Products <FaArrowRight />
                </button>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Slideshow;
