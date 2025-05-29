import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import apiClient from "../services/apiClient";
import "../components/styles/ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await apiClient.get(`/products/${id}`);
        const productData = response.data.productFound;
        setProduct(productData);
      } catch (err) {
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const incrementQuantity = () => {
    setQuantity((prev) => Math.min(product.totalQty || 10, prev + 1));
  };

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
    alert("Product added to cart!");
  };

  if (loading) return <p>Loading product...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="product-detail-page">
      <div className="product-image-section">
        <img
          src={product.images && product.images.length > 0 ? product.images[selectedImageIndex] : "/default-product.png"}
          alt={product.name}
          className="main-product-image"
        />
        <div className="thumbnail-images">
          {product.images && product.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${product.name} thumbnail ${idx + 1}`}
              className={`thumbnail-image ${selectedImageIndex === idx ? "selected" : ""}`}
              onClick={() => setSelectedImageIndex(idx)}
            />
          ))}
        </div>
      </div>
      <div className="product-info-section">
        <h1 className="product-title">{product.name}</h1>
        <p className="product-category">
          Category: <Link to={`/category/${product.category}`} className="category-link">{product.category}</Link>
        </p>
        <p className="product-description">{product.description}</p>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <p className="product-stock">{product.stockStatus || `${product.totalQty} in stock`}</p>
        <div className="quantity-selector">
          <button onClick={decrementQuantity} className="quantity-btn">-</button>
          <span className="quantity">{quantity}</span>
          <button onClick={incrementQuantity} className="quantity-btn">+</button>
        </div>
        <button className="add-to-cart-btn" onClick={handleAddToCart}>Add to cart</button>
      </div>
    </div>
  );
};

export default ProductDetail;
