import React, { useState } from "react";
import { collection, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase"; // Firebase Firestore
import { useNavigate } from "react-router-dom";

function Checkout({ cart, setCart }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      const counterRef = doc(db, "Counters", "OrderCounter");
      const counterSnap = await getDoc(counterRef);
      let newOrderID;

      if (counterSnap.exists()) {
        const lastOrderID = counterSnap.data().lastOrderID || 100; // Default to 100 if undefined
        newOrderID = lastOrderID + 1;
      } else {
        await setDoc(counterRef, { lastOrderID: 100 });
        newOrderID = 101; // First order after initialization
      }

      // New Order Data
      const newOrder = {
        user: {
          name,
          email,
          phone,
          address,
        },
        orderDetails: {
          items: cart,
          createdAt: new Date(),
        },
      };

      // Save order with unique ID
      await setDoc(doc(db, "Orders", newOrderID.toString()), newOrder);

      // Update the counter
      await updateDoc(counterRef, { lastOrderID: newOrderID });

      console.log("Order placed successfully:", newOrderID);
      alert(`Order Placed Successfully! Your Order ID: ${newOrderID}`);

      // Clear cart
      setCart([]);

      // Redirect to Thank You page
      navigate("/thankyou");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error processing order.");
    }
  };

  return (
    <div style={{ marginTop: "100px" }}>
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
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <button type="submit">Place Enquiry</button>
      </form>
    </div>
  );
}

export default Checkout;
