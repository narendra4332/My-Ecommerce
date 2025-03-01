import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../Firebase"; // Firebase Firestore
import { useNavigate } from "react-router-dom";

function Checkout({ cart, setCart }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      // Save order to Firestore
      const orderRef = await addDoc(collection(db, "Orders"), {
        name,
        address,
        items: cart,
        createdAt: new Date(),
      });

      console.log("Order placed successfully:", orderRef.id);
      alert("Order placed successfully!");

      // Clear the cart after checkout
      setCart([]);

      // Redirect to Thank You page
      navigate("/thankyou");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error processing order.");
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      <form onSubmit={handleCheckout}>
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Address" 
          value={address} 
          onChange={(e) => setAddress(e.target.value)} 
          required 
        />
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}

export default Checkout;