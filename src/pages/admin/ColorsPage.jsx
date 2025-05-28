import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { Eye, Edit, Trash2 } from "lucide-react";

const PAGE_SIZE = 5;

const ColorsPage = () => {
  const [colors, setColors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Placeholder static data for colors
  useEffect(() => {
    const fetchColors = async () => {
      // Replace with API call if available
      const data = [
        { id: "1", name: "Red", hex: "#FF0000" },
        { id: "2", name: "Green", hex: "#00FF00" },
        { id: "3", name: "Blue", hex: "#0000FF" },
        { id: "4", name: "Yellow", hex: "#FFFF00" },
        { id: "5", name: "Purple", hex: "#800080" },
        { id: "6", name: "Orange", hex: "#FFA500" },
      ];
      setColors(data);
    };
    fetchColors();
  }, []);

  const filteredColors = colors.filter((color) =>
    color.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredColors.length / PAGE_SIZE);

  const paginatedColors = filteredColors.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="admin-layout" style={{ display: "flex" }}>
      <Sidebar />
      <div className="colors-page" style={{ padding: "20px", flex: 1 }}>
        <h2>Colors</h2>
        <input
          type="text"
          placeholder="Search colors..."
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
              <th style={{ textAlign: "left", padding: "8px" }}>Hex Code</th>
              <th style={{ textAlign: "left", padding: "8px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedColors.map((color) => (
              <tr key={color.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "8px" }}>{color.name}</td>
                <td style={{ padding: "8px" }}>{color.hex}</td>
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
    </div>
  );
};

export default ColorsPage;
