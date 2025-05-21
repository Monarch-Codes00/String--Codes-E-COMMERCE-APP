import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { createOrder } from "../services/orderService";
import { useNavigate } from "react-router-dom";
import "../components/styles/Checkout.css";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError(null);
    try {
      const orderData = {
        items: cartItems.map(({ product, quantity }) => ({
          productId: product._id,
          quantity,
        })),
        total: totalPrice,
      };
      await createOrder(orderData);
      clearCart();
      alert("Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      setError("Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-container">
        <h2>Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <p>Total: ${totalPrice.toFixed(2)}</p>
      {error && <p className="error">{error}</p>}
      <button onClick={handlePlaceOrder} disabled={loading}>
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
};

export default Checkout;
