import { useAuth } from "../contexts/AuthContext";

const SuperAdminDashboard = () => {
  const { user } = useAuth();
  return (
    <div className="dashboard-container p-8">
      <h2 className="text-3xl font-bold mb-4">Super Admin Dashboard</h2>
      <p>Welcome, {user?.fullName}! You have admin privileges.</p>
      {/* Additional admin-specific actions go here */}
    </div>
  );
};

export default SuperAdminDashboard;
