import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../services/apiClient";
import Sidebar from "../components/Sidebar";
import "../components/styles/ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiClient.get("/products");
        console.log("Products API response:", response.data);
        setProducts(Array.isArray(response.data) ? response.data : response.data.products || []);
      } catch (err) {
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleSelectCategory = (category) => {
    setFilteredCategory(category);
  };

  const filteredProducts = filteredCategory
    ? products.filter((product) => product.category === filteredCategory)
    : products;

  const [displayCount, setDisplayCount] = React.useState(8);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  const displayedProducts = filteredProducts.slice(0, displayCount);

  const handleSeeMore = () => {
    setDisplayCount((prev) => prev + 8);
  };

  return (
    <div className="product-list-page">
      <Sidebar onSelectCategory={handleSelectCategory} />
      <div className="product-list-container">
        <h2>{filteredCategory ? `Category: ${filteredCategory}` : "Products"}</h2>
        <div className="product-grid">
          {displayedProducts.map((product) => (
            <div key={product._id} className="product-card">
              <Link to={`/product/${product._id}`}>
                <img
                  src={product.images && product.images[0]}
                  alt={product.name}
                  className="product-image"
                />
                <h3>{product.name}</h3>
                <p>${product.price.toFixed(2)}</p>
              </Link>
            </div>
          ))}
        </div>
        {displayCount < filteredProducts.length && (
          <button className="see-more-btn" onClick={handleSeeMore}>
            See More
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductList;
