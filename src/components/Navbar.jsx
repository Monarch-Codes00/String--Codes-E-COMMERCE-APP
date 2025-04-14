import { useAuth } from "../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import "./styles/Navbar.css"; // Import the vanilla CSS file

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle clicking on the brand link.
  const handleBrandClick = (e) => {
    e.preventDefault();

    if (user) {
      // If the user is logged in, check if they are an admin.
      if (user.isAdmin) {
        // Navigate to the Super Admin Dashboard if it's not already active.
        if (location.pathname !== "/superadmin-dashboard") {
          navigate("/superadmin-dashboard");
        }
      } else {
        // For normal users, navigate to the regular dashboard.
        if (location.pathname !== "/dashboard") {
          navigate("/dashboard");
        }
      }
    } else {
      // If not logged in, navigate to the public home page.
      navigate("/");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        {/* An anchor tag styled as a link without an actual href */}
        <a
          style={{ textDecoration: "none", cursor: "pointer" }}
          onClick={handleBrandClick}
        >
          🏠 Stringcode
        </a>
      </div>
      {user && (
        <div className="navbar-menu">
          <span className="navbar-welcome">Welcome, {user.fullName}</span>
          <button
            onClick={() => navigate("/profile")}
            className="navbar-button"
          >
            Profile
          </button>
          <button onClick={handleLogout} className="navbar-button logout">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
