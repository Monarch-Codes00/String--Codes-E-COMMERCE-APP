import { useState, useEffect } from "react";
import AdminPageLayout from "../../components/AdminPageLayout";
import { Eye, Edit, Trash2 } from "lucide-react";

const PAGE_SIZE = 5;

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Placeholder static data for reviews
  useEffect(() => {
    const fetchReviews = async () => {
      // Replace with API call if available
      const data = [
        { id: "1", user: "Alice", rating: 5, comment: "Great product!" },
        { id: "2", user: "Bob", rating: 4, comment: "Good value." },
        { id: "3", user: "Charlie", rating: 3, comment: "Average quality." },
        { id: "4", user: "Diana", rating: 5, comment: "Highly recommend!" },
        { id: "5", user: "Eve", rating: 2, comment: "Not satisfied." },
        { id: "6", user: "Frank", rating: 4, comment: "Works well." },
      ];
      setReviews(data);
    };
    fetchReviews();
  }, []);

  const filteredReviews = reviews.filter((review) =>
    review.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredReviews.length / PAGE_SIZE);

  const paginatedReviews = filteredReviews.slice(
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
        <h2>Reviews</h2>
        <input
          type="text"
          placeholder="Search reviews..."
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
              <th style={{ textAlign: "left", padding: "8px" }}>User</th>
              <th style={{ textAlign: "left", padding: "8px" }}>Rating</th>
              <th style={{ textAlign: "left", padding: "8px" }}>Comment</th>
              <th style={{ textAlign: "left", padding: "8px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedReviews.map((review) => (
              <tr key={review.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "8px" }}>{review.user}</td>
                <td style={{ padding: "8px" }}>{review.rating}</td>
                <td style={{ padding: "8px" }}>{review.comment}</td>
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

export default ReviewsPage;
