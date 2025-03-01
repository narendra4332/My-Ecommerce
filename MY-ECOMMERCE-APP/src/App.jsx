import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import ChecKout from "./Pages/ChecKout";
import ThankYou from "./Pages/Thankyou";
import Header from "./Components/Header";
import About from "./Pages/About";
import ProductCard from "./Components/ProductCard";
import Footer from "./Components/Footer";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]); // Add the product to the cart
  };
  return (
    <Router>
      <Header cart={cart} />
      <Routes>
        <Route path="/" element={<ProductCard />} />
        <Route path="About" element={<About />} />
        <Route path="/Product" element={<Product addToCart={addToCart} />} />
        <Route path="/Cart" element={<Cart cart={cart} />} />
        <Route
          path="/Checkout"
          element={<ChecKout cart={cart} setCart={setCart} />}
        />
        <Route path="/ThankYou" element={<ThankYou />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
