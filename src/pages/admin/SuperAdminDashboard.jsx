import { useAuth } from "../../contexts/AuthContext";
import "../../components/styles/SuperAdminDashboard.css";

const SuperAdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <a href="/superadmin-dashboard">Dashboard</a>
            </li>
            <li>
              <a href="/superadmin-dashboard/products">Products</a>
            </li>
            <li>
              <a href="/superadmin-dashboard/users">Users</a>
            </li>
            <li>
              <a href="/superadmin-dashboard/orders">Orders</a>
            </li>
            <li>
              <a href="/superadmin-dashboard/colors">Colors</a>
            </li>
            <li>
              <a href="/superadmin-dashboard/brands">Brands</a>
            </li>
            <li>
              <a href="/superadmin-dashboard/reviews">Reviews</a>
            </li>
            <li>
              <a href="/superadmin-dashboard/statistics">Statistics</a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <h1>Welcome, {user?.fullName}!</h1>
          <p>You have admin privileges.</p>
        </header>

        {/* Stats Cards */}
        <section className="stats-container">
          <div className="stat-card">
            <h3>Total Users</h3>
            <p>3,402</p>
          </div>
          <div className="stat-card">
            <h3>Total Products</h3>
            <p>1,205</p>
          </div>
          <div className="stat-card">
            <h3>Total Orders</h3>
            <p>845</p>
          </div>
          <div className="stat-card">
            <h3>Total Revenue</h3>
            <p>$76,230</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SuperAdminDashboard;
