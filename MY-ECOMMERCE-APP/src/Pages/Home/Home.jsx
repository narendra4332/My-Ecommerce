import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight, FaWhatsapp, FaPhone } from "react-icons/fa";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase";
import "./Style/Home.css";

// Import Components
import Slideshow from "./Slideshow";
import About from "./About";
import ProductSlider from "./ProductSlider";

function Home({ HomePageCount }) {
  const navigate = useNavigate();
  const whatsappNumber = "6264213443";
  const [products, setProducts] = useState([]);

  // Firestore se products fetch karna
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

  return (
    <div>
      {/* Slideshow Section */}
      <Slideshow HomePageCount={HomePageCount} />

      {/* About & Why Different Section */}
      <About navigate={navigate} />

      {/* Product Slider */}
      <ProductSlider products={products} />

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
  );
}

export default Home;
