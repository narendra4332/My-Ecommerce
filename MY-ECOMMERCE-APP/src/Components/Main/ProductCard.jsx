import { useState, useEffect } from "react";
import Home from "../../Pages/Home/Home";

function ProductCard() {
  const [HomePageCount, setHomePageCount] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setHomePageCount((count) => {
        return count === 2 ? 0 : count + 1;
      });
    }, 5000);
  }, []);

  return (
    <div>
      <Home HomePageCount={HomePageCount} />
    </div>
  );
}

export default ProductCard;
