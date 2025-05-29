import { useEffect, useState } from "react";
import { fetchProductsList } from "../../services/adminService";
import AdminPageLayout from "../../components/AdminPageLayout";
import CreateProductForm from "./CreateProductForm";

const PAGE_SIZE = 5;

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await fetchProductsList();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const totalPages = Math.ceil(products.length / PAGE_SIZE);

  const paginatedProducts = products.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getImageUrl = (images) => {
    if (!images || images.length === 0) return "/default-product.png";
    if (images[0].startsWith("http")) return images[0];
    return images[0];
  };

  const handleImageError = (e) => {
    e.target.src = "/default-product.png";
  };

  return (
    <AdminPageLayout>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2>Products</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            style={{
              marginBottom: "10px",
              padding: "8px 16px",
              backgroundColor: "#3bc9db",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {showAddForm ? "Close Add Product Form" : "Add New Product"}
          </button>
        </div>
        {showAddForm && (
          <div style={{ maxWidth: "600px", marginBottom: "20px" }}>
            <CreateProductForm />
          </div>
        )}
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #ddd" }}>
              <th style={{ textAlign: "left", padding: "8px" }}>Product</th>
              <th style={{ textAlign: "left", padding: "8px" }}>Product ID</th>
              <th style={{ textAlign: "left", padding: "8px" }}>Price</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.map((product) => (
              <tr key={product._id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "8px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <img
                    src={getImageUrl(product.images)}
                    alt={product.name}
                    onError={handleImageError}
                    style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "4px" }}
                  />
                  <span>{product.name}</span>
                </td>
                <td style={{ padding: "8px" }}>{product._id}</td>
                <td style={{ padding: "8px" }}>${(product.price / 100).toLocaleString() || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: "10px", display: "flex", justifyContent: "center", gap: "10px" }}>
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            {"<"}
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx + 1}
              onClick={() => handlePageChange(idx + 1)}
              style={{
                fontWeight: currentPage === idx + 1 ? "bold" : "normal",
                backgroundColor: currentPage === idx + 1 ? "#3bc9db" : "transparent",
                color: currentPage === idx + 1 ? "#fff" : "#000",
                border: "none",
                padding: "5px 10px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {idx + 1}
            </button>
          ))}
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            {">"}
          </button>
        </div>
      </div>
    </AdminPageLayout>
  );
};

export default ProductsPage;
