import React, { useState } from "react";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase"; // Firebase Firestore
import { useNavigate } from "react-router-dom";
import "./Checkout.css"; // Importing CSS

function Checkout({ cart, setCart }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState(""); // New Order Notes Field
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // Phone number validation
    if (!/^[0-9]{10}$/.test(phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    setLoading(true);

    try {
      const counterRef = doc(db, "Counters", "OrderCounter");
      const counterSnap = await getDoc(counterRef);
      let newOrderID;

      if (counterSnap.exists()) {
        const lastOrderID = counterSnap.data().lastOrderID || 100;
        newOrderID = lastOrderID + 1;
      } else {
        await setDoc(counterRef, { lastOrderID: 100 });
        newOrderID = 101;
      }

      // New Order Data
      const newOrder = {
        user: {
          name,
          email,
          phone,
          address,
          notes: notes.trim() || "N/A", // Store "N/A" if empty
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
      alert(`Thank you, ${name}! Your inquiry has been received.`);

      // Clear cart
      setCart([]);

      // Redirect to Thank You page
      navigate("/thankyou");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error processing order. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-checkout-box">
      <h1 className="checkout-title">Checkout</h1>
      <div className="checkout-container">
        <form onSubmit={handleCheckout} className="checkout-form">
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              pattern="[0-9]{10}"
              required
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <textarea
              placeholder="Any special instructions? (Optional)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <button type="submit" className="checkout-btn" disabled={loading}>
            {loading ? "Processing..." : "Submit Inquiry"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
