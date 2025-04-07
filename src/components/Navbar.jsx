import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./styles/Navbar.css"; // Import the vanilla CSS file

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a style={{ textDecoration: "none" }} href="/">
          My Modern App
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
