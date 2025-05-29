import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutGrid, Tag, Users, ShoppingCart, Palette, DollarSign, Star, Truck } from "lucide-react";

const Sidebar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();

  const iconMap = {
    LayoutGrid,
    Tag,
    Users,
    ShoppingCart,
    Palette,
    DollarSign,
    Star,
    Truck,
  };

  const menuItems = [
    { to: "/superadmin-dashboard", label: "Dashboard", icon: "LayoutGrid" },
    { to: "/admin/products", label: "Products", icon: "Tag" },
    { to: "/admin/users", label: "Users", icon: "Users" },
    { to: "/admin/orders", label: "Orders", icon: "ShoppingCart" },
    { to: "/admin/colors", label: "Colors", icon: "Palette" },
    { to: "/superadmin-dashboard/brands", label: "Brands", icon: "DollarSign" },
    { to: "/admin/reviews", label: "Reviews", icon: "Star" },
    { to: "/superadmin-dashboard/statistics", label: "Statistics", icon: "Truck" },
  ];

  return (
    <aside
      className="sidebar"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: isHovered ? 200 : 60,
        transition: "width 0.3s ease",
        overflow: "hidden",
        height: "100vh",
        position: "fixed",
        top: 67,
        left: 0,
        backgroundColor: "#1f2937",
        color: "#f9fafb",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        zIndex: 1000,
      }}
    >
      <div
        className="sidebar-header"
        style={{
          padding: "1.5rem 1rem 1rem 1rem",
          fontSize: "1.25rem",
          fontWeight: "bold",
          textAlign: isHovered ? "left" : "center",
          borderBottom: "1px solid rgba(255,255,255,0.3)",
          whiteSpace: "nowrap",
          overflow: "hidden",
          transition: "text-align 0.3s ease",
        }}
      >
        {isHovered ? "Admin Panel" : " "}
      </div>
      <nav className="sidebar-nav" style={{ flexGrow: 1 }}>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {menuItems.map(({ to, label, icon }) => {
            const IconComponent = iconMap[icon];
            const isActive = location.pathname === to;
            return (
              <li
                key={to}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0.75rem 1rem",
                  backgroundColor: isActive ? "#374151" : "transparent",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "background-color 0.3s ease",
                }}
              >
                <Link
                  to={to}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "inherit",
                    textDecoration: "none",
                    width: "100%",
                    overflow: "hidden",
                  }}
                >
                  {IconComponent && <IconComponent size={20} />}
                  <span
                    style={{
                      marginLeft: isHovered ? 12 : 0,
                      opacity: isHovered ? 1 : 0,
                      display: isHovered ? "inline-block" : "none",
                      transition: "opacity 0.3s ease",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
