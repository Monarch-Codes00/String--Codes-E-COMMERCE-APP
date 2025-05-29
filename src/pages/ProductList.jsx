import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCategories } from "../services/adminService";
import apiClient from "../services/apiClient";
import "../components/styles/ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiClient.get("/products");
        setProducts(Array.isArray(response.data) ? response.data : response.data.products || []);
      } catch (err) {
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    const fetchCategoryList = async () => {
      try {
        const cats = await fetchCategories();
        setCategories(cats);
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    };

    fetchProducts();
    fetchCategoryList();
  }, []);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prev) => ({ ...prev, [name]: value }));
  };

  const filterProducts = () => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchText.toLowerCase());
      const matchesCategory = selectedCategory ? (product.category === (selectedCategory.name || selectedCategory)) : true;
      const price = product.price || 0;
      const minPrice = priceRange.min ? parseFloat(priceRange.min) : 0;
      const maxPrice = priceRange.max ? parseFloat(priceRange.max) : Number.MAX_VALUE;
      const matchesPrice = price >= minPrice && price <= maxPrice;
      return matchesSearch && matchesCategory && matchesPrice;
    });
  };

  const filteredProducts = filterProducts();

  const [displayCount, setDisplayCount] = React.useState(8);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  const displayedProducts = filteredProducts.slice(0, displayCount);

  const handleSeeMore = () => {
    setDisplayCount((prev) => prev + 8);
  };

  return (
    <div className="product-list-page">
      <aside className="product-sidebar">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchText}
            onChange={handleSearchChange}
          />
        </div>
        <div className="category-filter">
          <h3>Categories</h3>
          <ul>
            {categories.map((cat) => (
              <li
                key={cat._id || cat.id || cat}
                className={selectedCategory === cat ? "selected" : ""}
                onClick={() => handleCategorySelect(cat)}
              >
                {cat.name || cat}
              </li>
            ))}
          </ul>
        </div>
        <div className="price-filter">
          <h3>Price Range</h3>
          <div>
            <input
              type="number"
              name="min"
              placeholder="Min"
              value={priceRange.min}
              onChange={handlePriceChange}
              min="0"
            />
            <input
              type="number"
              name="max"
              placeholder="Max"
              value={priceRange.max}
              onChange={handlePriceChange}
              min="0"
            />
          </div>
        </div>
      </aside>
      <main className="product-list-container">
        <h2>{selectedCategory ? `Category: ${selectedCategory.name || selectedCategory}` : "All Products"}</h2>
        <div className="product-grid">
          {displayedProducts.map((product) => (
            <div key={product._id} className="product-card">
              <Link to={`/product/${product._id}`} className="product-link">
                <img
                  src={product.images && product.images[0]}
                  alt={product.name}
                  className="product-image"
                />
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">${product.price.toFixed(2)}</p>
              </Link>
            </div>
          ))}
        </div>
        {displayCount < filteredProducts.length && (
          <button className="see-more-btn" onClick={handleSeeMore}>
            Load More
          </button>
        )}
      </main>
    </div>
  );
};

export default ProductList;
