import React from "react";
import { Outlet, Link } from "react-router-dom";
import { LayoutGrid, Tag, Users, ShoppingCart, Palette, DollarSign, Star, Truck } from "lucide-react";

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

const AdminLayout = () => {
  return (
    <div className="admin-dashboard" style={{ minHeight: "100vh", display: "flex" }}>
      {/* Sidebar */}
      <aside
        className="admin-sidebar"
        style={{
          minHeight: "100vh",
          width: "60px",
          transition: "width 0.3s ease",
          overflowX: "hidden",
          backgroundColor: "#1f2937",
          color: "#f9fafb",
          display: "flex",
          flexDirection: "column",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.width = "200px";
          const labels = e.currentTarget.querySelectorAll(".sidebar-label");
          labels.forEach((label) => {
            label.style.opacity = "1";
            label.style.display = "inline-block";
          });
          const header = e.currentTarget.querySelector(".sidebar-header h2");
          if (header) header.style.opacity = "1";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.width = "60px";
          const labels = e.currentTarget.querySelectorAll(".sidebar-label");
          labels.forEach((label) => {
            label.style.opacity = "0";
            label.style.display = "none";
          });
          const header = e.currentTarget.querySelector(".sidebar-header h2");
          if (header) header.style.opacity = "0";
        }}
      >
        <div
          className="sidebar-header"
          style={{
            padding: "1rem",
            fontSize: "1.25rem",
            fontWeight: "bold",
            textAlign: "center",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          <h2 style={{ opacity: 0, margin: 0, transition: "opacity 0.3s ease" }}>
            Admin Panel
          </h2>
        </div>
        <nav className="sidebar-nav" style={{ flexGrow: 1 }}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {[
              { to: "/superadmin-dashboard", label: "Dashboard", icon: "LayoutGrid" },
              { to: "/admin/products", label: "Products", icon: "Tag" },
              { to: "/superadmin-dashboard/users", label: "Users", icon: "Users" },
              { to: "/superadmin-dashboard/orders", label: "Orders", icon: "ShoppingCart" },
              { to: "/superadmin-dashboard/colors", label: "Colors", icon: "Palette" },
              { to: "/superadmin-dashboard/brands", label: "Brands", icon: "DollarSign" },
              { to: "/superadmin-dashboard/reviews", label: "Reviews", icon: "Star" },
              { to: "/superadmin-dashboard/statistics", label: "Statistics", icon: "Truck" },
            ].map(({ to, label, icon }) => {
              const IconComponent = iconMap[icon];
              return (
                <li key={to} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Link
                    to={to}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "0.75rem 1rem",
                      color: "inherit",
                      textDecoration: "none",
                      width: "100%",
                      whiteSpace: "nowrap",
                      justifyContent: "flex-start",
                    }}
                  >
                    {IconComponent && <IconComponent size={20} />}
                    <span
                      className="sidebar-label"
                      style={{
                        marginLeft: "12px",
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                        overflow: "hidden",
                        display: "none",
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

      {/* Main Content */}
      <main className="admin-main" style={{ flexGrow: 1, padding: "1rem" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
