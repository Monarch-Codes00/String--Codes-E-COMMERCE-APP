import { Link } from "react-router-dom";
import { ShoppingCart, Users, Truck, DollarSign, Tag, Palette, Star, LayoutGrid } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="admin-sidebar" style={{ height: "100vh", overflowY: "auto" }}>
      <div className="sidebar-header">
        <h2>Admin Panel</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link to="/superadmin-dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/admin/products">Products</Link>
          </li>
          <li>
            <Link to="/admin/users">Users</Link>
          </li>
          <li>
            <Link to="/admin/orders">Orders</Link>
          </li>
          <li>
            <Link to="/admin/colors">Colors</Link>
          </li>
          <li>
            <Link to="/superadmin-dashboard/brands">Brands</Link>
          </li>
          <li>
            <Link to="/admin/reviews">Reviews</Link>
          </li>
          <li>
            <Link to="/superadmin-dashboard/statistics">Statistics</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
