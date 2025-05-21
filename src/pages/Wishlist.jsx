import React, { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";
import "../components/styles/Wishlist.css";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addItem } = useCart();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await apiClient.get("/wishlist");
        setWishlist(response.data);
      } catch (err) {
        setError("Failed to load wishlist.");
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  const handleAddToCart = (product) => {
    addItem(product, 1);
    alert("Product added to cart!");
  };

  if (loading) return <p>Loading wishlist...</p>;
  if (error) return <p>{error}</p>;
  if (wishlist.length === 0) return <p>Your wishlist is empty.</p>;

  return (
    <div className="wishlist-container">
      <h2>Your Wishlist</h2>
      <div className="wishlist-grid">
        {wishlist.map((product) => (
          <div key={product._id} className="wishlist-card">
            <Link to={`/product/${product._id}`}>
              <img
                src={product.images && product.images[0]}
                alt={product.name}
                className="wishlist-image"
              />
              <h3>{product.name}</h3>
              <p>${product.price.toFixed(2)}</p>
            </Link>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
