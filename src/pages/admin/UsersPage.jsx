import { useEffect, useState } from "react";
import { fetchUsersList } from "../../services/adminService";
import Sidebar from "../../components/Sidebar";
import { Eye, Edit, Trash2 } from "lucide-react";

const PAGE_SIZE = 5;

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await fetchUsersList();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);

  const paginatedUsers = filteredUsers.slice(
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
      <div className="users-page" style={{ padding: "20px", flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2>Users</h2>
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
            {showAddForm ? "Close Add User Form" : "Add New User"}
          </button>
        </div>
        {showAddForm && (
          <div style={{ maxWidth: "600px", marginBottom: "20px" }}>
            {/* Placeholder for Add User Form */}
            <p>Add User Form goes here.</p>
          </div>
        )}
        <input
          type="text"
          placeholder="Search users..."
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
              <th style={{ textAlign: "left", padding: "8px" }}>Phone</th>
              <th style={{ textAlign: "left", padding: "8px" }}>Email</th>
              <th style={{ textAlign: "left", padding: "8px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user) => (
              <tr key={user._id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "8px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <img
                    src={user.avatar || "/default-avatar.png"}
                    alt={user.fullName}
                    style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }}
                  />
                  <span>{user.fullName}</span>
                </td>
                <td style={{ padding: "8px" }}>{user.phone || "N/A"}</td>
                <td style={{ padding: "8px" }}>{user.email || "N/A"}</td>
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

export default UsersPage;
