import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import s1 from "../assets/s1.jpg";
import s4 from "../assets/s4.jpg";
import s5 from "../assets/s5.png";

function Home({ HomePageCount }) {
  if (HomePageCount === 0) {
    return (
      <>
        <img src={s1} className="background fade-in" alt="" />
        <div className="text-style">
          <h1>Welcome to Our E-Commerce Store</h1>
          <Link to="/Product">
            <button>Shop Now</button>
          </Link>
        </div>
      </>
    );
  } else if (HomePageCount === 1) {
    return (
      <>
        <img src={s4} className="background fade-in" alt="" />
        <div className="text-style">
          <h1>Welcome to Our E-Commerce Store</h1>
          <Link to="/Product">
            <button>Shop Now</button>
          </Link>
        </div>
      </>
    );
  } else if (HomePageCount === 2) {
    return (
      <>
        <img src={s5} className="background fade-in" alt="" />
        <div className="text-style">
          <h1>Welcome to Our E-Commerce Store</h1>
          <Link to="/Product">
            <button>Shop Now</button>
          </Link>
        </div>
      </>
    );
  }
}

export default Home;
