
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useCart } from "../contexts/CartContext";
// import apiClient from "../services/apiClient";
// import "../components/styles/ProductDetail.css";

// const ProductDetail = () => {
//   const { id } = useParams();
//   const { addItem } = useCart();
//   const [product, setProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);
//   const [selectedSize, setSelectedSize] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await apiClient.get(`/products/${id}`);
//         const productData = response.data.productFound;
//         setProduct(productData);
//         if (productData.sizes && productData.sizes.length > 0) {
//           setSelectedSize(productData.sizes[0]);
//         }
//       } catch (err) {
//         setError("Failed to load product.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   const handleAddToCart = () => {
//     if (!selectedSize) {
//       alert("Please select a size.");
//       return;
//     }
//     addItem({ ...product, selectedSize }, quantity);
//     alert("Product added to cart!");
//   };

//   const incrementQuantity = () => {
//     setQuantity((prev) => Math.min(product.totalQty || 10, prev + 1));
//   };

//   const decrementQuantity = () => {
//     setQuantity((prev) => Math.max(1, prev - 1));
//   };

//   if (loading) return <p>Loading product...</p>;
//   if (error) return <p>{error}</p>;
//   if (!product) return <p>Product not found.</p>;

//   const discountPercent = product.originalPrice
//     ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
//     : 0;

//   return (
//     <div className="product-detail-container">
//       <div className="left-section">
//         <img
//           src={product.images && product.images.length > 0 ? product.images[selectedImageIndex] : "/default-product.png"}
//           alt={product.name}
//           className="product-detail-image"
//         />
//         <div className="thumbnail-container">
//           {product.images && product.images.map((img, idx) => (
//             <img
//               key={idx}
//               src={img}
//               alt={`${product.name} thumbnail ${idx + 1}`}
//               className={`thumbnail-image ${selectedImageIndex === idx ? "selected" : ""}`}
//               onClick={() => setSelectedImageIndex(idx)}
//             />
//           ))}
//         </div>
//       </div>
//       <div className="right-section">
//         <h2 className="product-title">{product.name}</h2>
//         <p className="product-brand">Brand: {product.brand}</p>
//         <p className="product-description">{product.description}</p>
//         <div className="price-section">
//           <span className="current-price">₦ {product.price ? product.price.toLocaleString() : "N/A"}</span>
//           {product.originalPrice && (
//             <>
//               <span className="original-price">₦ {product.originalPrice.toLocaleString()}</span>
//               <span className="discount-percent">-{discountPercent}%</span>
//             </>
//           )}
//         </div>
//         {product.stockStatus && <div className="stock-info">{product.stockStatus}</div>}
//         {product.shippingCost && product.shippingLocation && (
//           <div className="shipping-info">
//             + shipping from ₦ {product.shippingCost} to {product.shippingLocation}
//           </div>
//         )}
//         <div className="quantity-section">
//           <label>Quantity:</label>
//           <div className="quantity-controls">
//             <button type="button" onClick={decrementQuantity} className="quantity-btn">-</button>
//             <span className="quantity-number">{quantity}</span>
//             <button type="button" onClick={incrementQuantity} className="quantity-btn">+</button>
//             <span className="quantity-added-text">({quantity} item{quantity > 1 ? "s" : ""} added)</span>
//           </div>
//         </div>
//         <div className="rating-section">
//           <div className="stars">
//             {[...Array(5)].map((_, i) => (
//               <span key={i} className={`star ${i < (product.rating || 4) ? "filled" : ""}`}>★</span>
//             ))}
//           </div>
//           <a href="#reviews" className="verified-ratings-link">
//             ({product.reviewCount || 25} verified ratings)
//           </a>
//         </div>
//         <div className="variation-section">
//           <div className="variation-label">VARIATION AVAILABLE</div>
//           <div className="size-guide">Size Guide</div>
//           <div className="size-buttons">
//             {product.sizes && product.sizes.map((size) => (
//               <button
//                 key={size}
//                 className={`size-button ${selectedSize === size ? "selected" : ""}`}
//                 onClick={() => setSelectedSize(size)}
//               >
//                 {size}
//               </button>
//             ))}
//           </div>
//         </div>
//         <button className="add-to-cart-btn" onClick={handleAddToCart}>
//           <span className="cart-icon">🛒</span> Add to cart
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import apiClient from "../services/apiClient";
import "../components/styles/ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await apiClient.get(`/products/${id}`);
        const productData = response.data.productFound;
        setProduct(productData);
        if (productData.sizes && productData.sizes.length > 0) {
          setSelectedSize(productData.sizes[0]);
        }
      } catch (err) {
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }
    addItem({ ...product, selectedSize }, quantity);
    alert("Product added to cart!");
  };

  const incrementQuantity = () => {
    setQuantity((prev) => Math.min(product.totalQty || 10, prev + 1));
  };

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  if (loading) return <p>Loading product...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found.</p>;

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="product-detail-container">
      <div className="left-section">
        <img
          src={product.images && product.images.length > 0 ? product.images[selectedImageIndex] : "/default-product.png"}
          alt={product.name}
          className="product-detail-image proportional-image"
        />
        <div className="thumbnail-container">
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
      <div className="right-section">
        <h2 className="product-title">{product.name}</h2>
        <p className="product-brand">Brand: {product.brand}</p>
        <p className="product-description">{product.description}</p>
        <div className="price-section">
          <span className="current-price">₦ {product.price ? product.price.toLocaleString() : "N/A"}</span>
          {product.originalPrice && (
            <>
              <span className="original-price">₦ {product.originalPrice.toLocaleString()}</span>
              <span className="discount-percent">-{discountPercent}%</span>
            </>
          )}
        </div>
        {product.stockStatus && <div className="stock-info">{product.stockStatus}</div>}
        {product.shippingCost && product.shippingLocation && (
          <div className="shipping-info">
            + shipping from ₦ {product.shippingCost} to {product.shippingLocation}
          </div>
        )}
        <div className="quantity-section">
          <label>Quantity:</label>
          <div className="quantity-controls">
            <button type="button" onClick={decrementQuantity} className="quantity-btn">-</button>
            <span className="quantity-number">{quantity}</span>
            <button type="button" onClick={incrementQuantity} className="quantity-btn">+</button>
            <span className="quantity-added-text">({quantity} item{quantity > 1 ? "s" : ""} added)</span>
          </div>
        </div>
        <div className="rating-section">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`star ${i < (product.rating || 4) ? "filled" : ""}`}>★</span>
            ))}
          </div>
          <a href="#reviews" className="verified-ratings-link">
            ({product.reviewCount || 25} verified ratings)
          </a>
        </div>
        <div className="variation-section">
          <div className="variation-label">VARIATION AVAILABLE</div>
          <div className="size-guide">Size Guide</div>
          <div className="size-buttons">
            {product.sizes && product.sizes.map((size) => (
              <button
                key={size}
                className={`size-button ${selectedSize === size ? "selected" : ""}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          <span className="cart-icon">🛒</span> Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
