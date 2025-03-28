import React, { useState } from "react";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

function Checkout({ cart, setCart }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleCheckout = async () => {
    // 🚀 **Alert-based Confirmation**
    const isConfirmed = window.confirm(
      "Are you sure you want to submit this inquiry?\n\nOnce submitted, our team will review your request and get back to you."
    );

    if (!isConfirmed) return; // User ne cancel kiya toh function stop ho jayega

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

      const newOrder = {
        user: { name, email, phone, address, notes: notes.trim() || "N/A" },
        orderDetails: { items: cart, createdAt: new Date() },
      };

      await setDoc(doc(db, "Orders", newOrderID.toString()), newOrder);
      await updateDoc(counterRef, { lastOrderID: newOrderID });

      // alert(
      //   `Thank you, ${name}! Your inquiry has been successfully submitted.`
      // );
      setCart([]);
      navigate("/thankyou", { state: { userName: name } });
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error processing order. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-checkout-box">
      <h1 className="checkout-title">Submit Your Inquiry</h1>
      <div className="checkout-container">
        <form onSubmit={(e) => e.preventDefault()} className="checkout-form">
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

          <button
            type="button"
            className="checkout-btn"
            onClick={handleCheckout}
            disabled={loading}
          >
            {loading ? "Processing..." : "Confirm & Submit Inquiry"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
