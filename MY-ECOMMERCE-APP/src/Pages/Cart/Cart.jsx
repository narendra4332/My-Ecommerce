import React from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css"; // Importing CSS file

function Cart({ cart, setCart }) {
  const navigate = useNavigate();

  // Function to Delete an Item
  const handleDelete = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  return (
    <div className="cart-main-container">
      <h1 className="cart-title">Your Cart</h1>
      <div className="cart-container">
        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          <div className="cart-items">
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <img
                  src={item.ImageURL}
                  alt={item.Name}
                  className="cart-image"
                />
                <div className="cart-details">
                  <p className="cart-name">{item.Name}</p>
                </div>
                <div>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {cart.length > 0 && (
          <button
            className="checkout-button"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Inquiry
          </button>
        )}
      </div>
    </div>
  );
}

export default Cart;
