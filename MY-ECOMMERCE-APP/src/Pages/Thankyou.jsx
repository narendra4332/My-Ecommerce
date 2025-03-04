import React from "react";
import { Link } from "react-router-dom";

function ThankYou() {
  return (
    <div style={{ marginTop: "100px" }}>
      <h1>Thank You for Your Order!</h1>
      <p>Your order has been successfully placed.</p>
      <Link to="/">Go Back to Home</Link>
    </div>
  );
}

export default ThankYou;
