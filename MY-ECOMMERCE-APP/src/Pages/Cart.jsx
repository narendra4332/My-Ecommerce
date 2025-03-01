import React from "react";
import { useNavigate } from "react-router-dom";

function Cart({ cart }) {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item, index) => (
          <div key={index}>
            <img
              style={{ width: "200px" }}
              src={item.ImageURL}
              alt={item.Name}
              className="product-image"
            />
            <p>id:{item.id}</p>
            <p>Name:{item.Name}</p>
            <p>Price: ${item.Price}</p>
          </div>
        ))
      )}
      <button onClick={() => navigate("/checkout")}>Proceed to Checkout</button>
    </div>
  );
}

export default Cart;
