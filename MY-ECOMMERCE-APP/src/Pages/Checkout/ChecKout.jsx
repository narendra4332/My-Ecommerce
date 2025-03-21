import React, { useState } from "react";
import { collection, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase"; // Firebase Firestore
import { useNavigate } from "react-router-dom";
import "./Checkout.css"; // Importing CSS
import { FaCreditCard } from "react-icons/fa";

function Checkout({ cart, setCart }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState(""); // New Order Notes Field

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
          notes, // Include Order Notes
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
      alert(`Enquiry Placed Successfully! Your Order ID: ${newOrderID}`);

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
    <>
      <div className="main-checkout-box">
        <h1 className="checkout-title">Checkout</h1>
        <div className="checkout-container">
          <form onSubmit={handleCheckout} className="checkout-form">
            <div className="input-group">
              {/* <label>Full Name</label> */}
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              {/* <label>Email Address</label> */}
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              {/* <label>Phone Number</label> */}
              <input
                type="number"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              {/* <label>Shipping Address</label> */}
              <input
                type="text"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              {/* <label>Order Notes (Optional)</label> */}
              <textarea
                placeholder="Any special instructions?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <button type="submit" className="checkout-btn">
              Place Enquiry
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Checkout;
