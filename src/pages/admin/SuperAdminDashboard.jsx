import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { fetchUsersList, fetchProductsList } from "../../services/adminService";
import { fetchOrders } from "../../services/orderService";
import { Outlet, Link } from "react-router-dom";
import "../../components/styles/SuperAdminDashboard.css";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { ShoppingCart, Users, Truck, DollarSign } from "lucide-react";

const COLORS = ["#3bc9db", "#6c757d", "#e9ecef"];

const monthlyTarget = 1900000;

const targetData = [
  { name: "Amount Made", value: 1200000, color: COLORS[0] },
  { name: "Remaining", value: monthlyTarget - 1200000, color: COLORS[1] },
];

const revenueData = [
  { name: "Week 1", revenue: 300000 },
  { name: "Week 2", revenue: 450000 },
  { name: "Week 3", revenue: 600000 },
  { name: "Week 4", revenue: 550000 },
  { name: "Week 5", revenue: 700000 },
  { name: "Week 6", revenue: 650000 },
  { name: "Week 7", revenue: 800000 },
  { name: "Week 8", revenue: 750000 },
];

const SuperAdminDashboard = () => {
  const { user } = useAuth();
  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(845); // Default static value
  const [newCustomers, setNewCustomers] = useState(0);
  const [totalDelivery, setTotalDelivery] = useState(72000); // Default static value
  const [amountMade, setAmountMade] = useState(1200000); // Default static value

  useEffect(() => {
    // Fetch users, products, and orders concurrently
    const fetchStats = async () => {
      try {
        const [users, products, orders] = await Promise.all([
          fetchUsersList(),
          fetchProductsList(),
          fetchOrders(),
        ]);
        setUserCount(users.length);
        setProductCount(products.length);

        // Set newCustomers dynamically from users count
        setNewCustomers(users.length);

        // Set orderCount dynamically or fallback to default
        setOrderCount(orders.length || 845);

        // Calculate total revenue (amountMade) excluding tax or fallback to default
        const totalRevenue = orders.reduce((sum, order) => {
          const amountExcludingTax = order.totalAmount - (order.taxAmount || 0);
          return sum + (amountExcludingTax > 0 ? amountExcludingTax : 0);
        }, 0);
        setAmountMade(totalRevenue > 0 ? totalRevenue : 1200000);

        // Calculate total delivery (sum of delivery fees) or fallback to default
        const totalDeliveryFees = orders.reduce((sum, order) => {
          return sum + (order.deliveryFee || 0);
        }, 0);
        setTotalDelivery(totalDeliveryFees > 0 ? totalDeliveryFees : 72000);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };
    fetchStats();
  }, []);

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
              <Link to="/superadmin-dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/admin/products">Products</Link>
            </li>
            <li>
              <Link to="/superadmin-dashboard/users">Users</Link>
            </li>
            <li>
              <Link to="/superadmin-dashboard/orders">Orders</Link>
            </li>
            <li>
              <Link to="/superadmin-dashboard/colors">Colors</Link>
            </li>
            <li>
              <Link to="/superadmin-dashboard/brands">Brands</Link>
            </li>
            <li>
              <Link to="/superadmin-dashboard/reviews">Reviews</Link>
            </li>
            <li>
              <Link to="/superadmin-dashboard/statistics">Statistics</Link>
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

        {/* Dashboard Charts */}
        <section className="dashboard-charts" style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 300px", minWidth: "300px", border: "1px solid #ccc", borderRadius: "8px", padding: "16px" }}>
            <h3>Monthly Target</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={targetData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  label
                >
                  {targetData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-around mt-4 text-sm">
              <div className="flex items-center space-x-2">
                <div
                  style={{ backgroundColor: COLORS[0] }}
                  className="w-3 h-3 rounded-full"
                ></div>
                <span>Amount Made</span>
                <span>${amountMade.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  style={{ backgroundColor: COLORS[1] }}
                  className="w-3 h-3 rounded-full"
                ></div>
                <span>Remaining</span>
                <span>${(monthlyTarget - amountMade).toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div style={{ flex: "2 1 600px", minWidth: "300px", border: "1px solid #ccc", borderRadius: "8px", padding: "16px" }}>
            <h3>Revenue Made</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={revenueData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#3bc9db" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Bottom Summary Cards */}
        <section className="stats-container" style={{ display: "flex", gap: "24px", marginTop: "24px", flexWrap: "wrap", backgroundColor: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <div className="stat-card" style={{ flex: "1 1 220px", borderRadius: "12px", padding: "20px", backgroundColor: "#f9fafb", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <DollarSign size={28} color="#3bc9db" />
              <div>
                <h3 style={{ fontWeight: "600", fontSize: "1.125rem", marginBottom: "4px" }}>Total Revenue</h3>
                <p style={{ fontSize: "1.75rem", fontWeight: "700", margin: 0 }}>${amountMade.toLocaleString()}</p>
                <p style={{ color: "#22c55e", fontWeight: "500", marginTop: "4px", fontSize: "0.875rem" }}>Revenue up (previous 30 days)</p>
              </div>
            </div>
          </div>

          <div className="stat-card" style={{ flex: "1 1 220px", borderRadius: "12px", padding: "20px", backgroundColor: "#f9fafb", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <ShoppingCart size={28} color="#f97316" />
              <div>
                <h3 style={{ fontWeight: "600", fontSize: "1.125rem", marginBottom: "4px" }}>Total Orders</h3>
                <p style={{ fontSize: "1.75rem", fontWeight: "700", margin: 0 }}>{orderCount.toLocaleString()}</p>
                <p style={{ color: "#ef4444", fontWeight: "500", marginTop: "4px", fontSize: "0.875rem" }}>Order down (previous 30 days)</p>
              </div>
            </div>
          </div>

          <div className="stat-card" style={{ flex: "1 1 220px", borderRadius: "12px", padding: "20px", backgroundColor: "#f9fafb", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <Users size={28} color="#22c55e" />
              <div>
                <h3 style={{ fontWeight: "600", fontSize: "1.125rem", marginBottom: "4px" }}>New Customers</h3>
                <p style={{ fontSize: "1.75rem", fontWeight: "700", margin: 0 }}>{newCustomers.toLocaleString()}</p>
                <p style={{ color: "#22c55e", fontWeight: "500", marginTop: "4px", fontSize: "0.875rem" }}>Customer up (previous 30 days)</p>
              </div>
            </div>
          </div>

          <div className="stat-card" style={{ flex: "1 1 220px", borderRadius: "12px", padding: "20px", backgroundColor: "#f9fafb", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <Truck size={28} color="#facc15" />
              <div>
                <h3 style={{ fontWeight: "600", fontSize: "1.125rem", marginBottom: "4px" }}>Total Delivery</h3>
                <p style={{ fontSize: "1.75rem", fontWeight: "700", margin: 0 }}>{totalDelivery.toLocaleString()}</p>
                <p style={{ color: "#22c55e", fontWeight: "500", marginTop: "4px", fontSize: "0.875rem" }}>Delivery up (previous 30 days)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Nested Routes Outlet */}
        <section className="admin-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default SuperAdminDashboard;
