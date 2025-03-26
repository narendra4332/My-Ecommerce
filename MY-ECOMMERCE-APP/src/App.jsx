import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "./Firebase"; // Firestore import kiya
import { doc, getDoc } from "firebase/firestore";
import Product from "./Pages/Products/Product";
import Cart from "./Pages/Cart/Cart";
import ChecKout from "./Pages/Checkout/ChecKout";
import ThankYou from "./Pages/Thankyou/Thankyou";
import Header from "./Components/Header/Header";
import About from "./Pages/About/About";
import ProductCard from "./Components/Main/ProductCard";
import Footer from "./Components/Footer/Footer";
import Auth from "./Pages/Authantication/Auth";
import Contact from "./Pages/Contact/Contact";
import Orders from "./Pages/Orders/Orders"; // Orders Page Import
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null); // ✅ Role State

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // ✅ Firestore se Role Fetch karna
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserRole(userSnap.data().role); // "admin" ya "user"
        } else {
          setUserRole("user"); // Default role
        }
      } else {
        setUserRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setUserRole(null);
  };

  return (
    <Router>
      {user && (
        <Header cart={cart} handleLogout={handleLogout} userRole={userRole} />
      )}
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
            <Route
              path="/cart"
              element={<Cart cart={cart} setCart={setCart} />}
            />
            <Route
              path="/checkout"
              element={<ChecKout cart={cart} setCart={setCart} />}
            />
            <Route path="/thankyou" element={<ThankYou />} />

            {/* ✅ Orders sirf admin ko dikhayenge */}
            {userRole === "admin" && (
              <Route path="/Orders" element={<Orders />} />
            )}
          </>
        )}
      </Routes>
      {user && <Footer />}
    </Router>
  );
}

export default App;
