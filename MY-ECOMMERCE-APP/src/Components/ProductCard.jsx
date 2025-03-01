import { useState, useEffect } from "react";
import Home from "../Pages/Home";
import About from "../Pages/About";
import Product from "../Pages/Product";

function ProductCard() {
  const [HomePageCount, setHomePageCount] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setHomePageCount((count) => {
        return count === 2 ? 0 : count + 1;
      });
    }, 3000);
  }, []);

  return (
    <div>
      <Home HomePageCount={HomePageCount} />
      <About />
      <Product />
    </div>
  );
}

export default ProductCard;
