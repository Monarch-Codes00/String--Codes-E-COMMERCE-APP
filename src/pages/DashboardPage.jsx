import { useAuth } from "../contexts/AuthContext";
import "../components/styles/DashboardPage.css";

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome, {user?.fullName}</h1>
        <p>Your personalized eCommerce dashboard</p>
      </header>

      <section className="dashboard-profile">
        <div className="profile-card">
          <h2>Profile Overview</h2>
          <p>
            <strong>Name:</strong> {user?.fullName}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Role:</strong> {user?.isAdmin ? "Admin" : "Customer "}
          </p>
          <p>
            <strong>Account Created:</strong>{" "}
            {new Date(user?.createdAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        <div className="profile-stats">
          <div className="stat-card">
            <h3>Orders</h3>
            <p>{user?.order?.length || 0}</p>
          </div>
          <div className="stat-card">
            <h3>Wishlists</h3>
            <p>{user?.wishLists?.length || 0}</p>
          </div>
        </div>
      </section>

      <section className="dashboard-actions">
        <h2>Quick Actions</h2>
        <button className="action-btn">View Orders</button>
        <button className="action-btn">Manage Wishlist</button>
        {user?.isAdmin && (
          <button className="action-btn">Go to Admin Panel</button>
        )}
      </section>
    </div>
  );
};

export default DashboardPage;


