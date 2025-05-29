import { useState, useEffect } from "react";
import AdminPageLayout from "../../components/AdminPageLayout";
import { Eye, Edit, Trash2 } from "lucide-react";
import { fetchBrands } from "../../services/adminService";

const PAGE_SIZE = 5;

const BrandsPage = () => {
  const [brands, setBrands] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchBrandsData = async () => {
      try {
        const data = await fetchBrands();
        setBrands(data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };
    fetchBrandsData();
  }, []);

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBrands.length / PAGE_SIZE);

  const paginatedBrands = filteredBrands.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <AdminPageLayout>
      <div>
        <h2>Brands</h2>
        <input
          type="text"
          placeholder="Search brands..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            marginBottom: "10px",
            padding: "8px",
            width: "100%",
            maxWidth: "400px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #ddd" }}>
              <th style={{ textAlign: "left", padding: "8px" }}>Name</th>
              <th style={{ textAlign: "left", padding: "8px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedBrands.map((brand) => (
              <tr key={brand._id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "8px" }}>{brand.name}</td>
                <td style={{ padding: "8px", display: "flex", gap: "10px" }}>
                  <button title="View" style={{ background: "none", border: "none", cursor: "pointer" }}>
                    <Eye size={18} color="#3bc9db" />
                  </button>
                  <button title="Edit" style={{ background: "none", border: "none", cursor: "pointer" }}>
                    <Edit size={18} color="#22c55e" />
                  </button>
                  <button title="Delete" style={{ background: "none", border: "none", cursor: "pointer" }}>
                    <Trash2 size={18} color="#ef4444" />
                  </button>
                </td>
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

export default BrandsPage;
