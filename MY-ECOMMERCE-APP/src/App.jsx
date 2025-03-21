import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./Firebase";
import Product from "./Pages/Products/Product";
import Cart from "./Pages/Cart/Cart";
import ChecKout from "./Pages/Checkout/ChecKout";
import ThankYou from "./Pages/Thankyou/Thankyou";
import Header from "./Components/Header/Header";
import About from "./Pages/About/About";
import ProductCard from "./Components//Main/ProductCard";
import Footer from "./Components/Footer/Footer";
import Auth from "./Pages/Authantication/Auth";
import Contact from "./Pages/Contact/Contact";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <Router>
      {user && <Header cart={cart} handleLogout={handleLogout} />}
      <Routes>
        {!user ? (
          <>
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<Navigate to="/auth" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<ProductCard />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/Product"
              element={<Product addToCart={addToCart} />}
            />
            <Route path="/Contact" element={<Contact />} />

            <Route path="/cart" element={<Cart cart={cart} />} />

            <Route
              path="/checkout"
              element={<ChecKout cart={cart} setCart={setCart} />}
            />
            <Route path="/thankyou" element={<ThankYou />} />
          </>
        )}
      </Routes>
      {user && <Footer />}
    </Router>
  );
}

export default App;
