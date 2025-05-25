import React from "react";
import { useCart } from "../contexts/CartContext";
import { Link, useNavigate } from "react-router-dom";
import "../components/styles/Cart.css";

const Cart = () => {
  const { cartItems, removeItem, updateQuantity, clearCart, loading, error } = useCart();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="cart-container">
        <h2>Loading cart...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cart-container">
        <h2>Error: {error}</h2>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <h2>Your Cart is Empty</h2>
        <Link to="/products">Go to Products</Link>
      </div>
    );
  }

  const handleQuantityDecrease = (productId, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantity(productId, currentQuantity - 1);
    }
  };

  const handleQuantityIncrease = (productId, currentQuantity) => {
    updateQuantity(productId, currentQuantity + 1);
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <div className="cart-left">
        <h2>Cart ({totalItems})</h2>
        {cartItems.map(({ product, quantity }) => (
          <div key={product._id} className="cart-item">
            <img src={product.images && product.images[0]} alt={product.name} className="cart-item-image" />
            <div className="cart-item-details">
              <h3>{product.name}</h3>
              {product.size && <p>Size: {product.size}</p>}
              {product.stock !== undefined && (
                <p className={`stock-info ${product.stock <= 6 ? "low-stock" : ""}`}>
                  {product.stock > 0 ? `${product.stock} units left` : "Out of stock"}
                </p>
              )}
              <p className="shipping-info">JUMIA <span className="express">EXPRESS</span></p>
              <button className="remove-button" onClick={() => removeItem(product._id)}>
                🗑 Remove
              </button>
              <div className="quantity-controls">
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityDecrease(product._id, quantity)}
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <span className="quantity">{quantity}</span>
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityIncrease(product._id, quantity)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="cart-item-pricing">
              <p className="current-price">₦ {product.price.toLocaleString()}</p>
              {/* Discount section excluded as per user request */}
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3>CART SUMMARY</h3>
        <p>Item's total ({totalItems})</p>
        <p className="total-price">₦ {totalPrice.toLocaleString()}</p>
        {/* Placeholder for discount info */}
        <p>Buy 2 Items, Get ₦850 Off</p>
        <p className="subtotal">
          Subtotal <span>₦ {totalPrice.toLocaleString()}</span>
        </p>
        <button className="checkout-button" onClick={handleCheckout}>
          Checkout (₦ {totalPrice.toLocaleString()})
        </button>
      </div>
    </div>
  );
};

export default Cart;
