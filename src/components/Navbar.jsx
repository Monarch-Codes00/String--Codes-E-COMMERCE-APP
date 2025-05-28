import { useAuth } from "../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import "./styles/Navbar.css"; // Import the vanilla CSS file

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = useCart();

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
        // For normal users, navigate to the product listing page.
        if (location.pathname !== "/products") {
          navigate("/products");
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

  const handleCartClick = () => {
    navigate("/cart");
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

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
          {/* Removed welcome message */}
          <button
            onClick={() => navigate("/profile")}
            className="navbar-button"
            style={{
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              padding: 0,
              fontSize: "1.25rem",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textTransform: "uppercase",
            }}
            aria-label="Profile"
          >
            {user.fullName ? user.fullName.charAt(0) : "U"}
          </button>
          {/* Removed Logout button */}
          <button
            onClick={handleCartClick}
            className="navbar-button cart-button"
            aria-label="Cart"
            style={{ position: "relative" }}
          >
            🛒
            {totalItems > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-5px",
                  right: "-10px",
                  background: "red",
                  color: "white",
                  borderRadius: "50%",
                  padding: "2px 6px",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                {totalItems}
              </span>
            )}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
