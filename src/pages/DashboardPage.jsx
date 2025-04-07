import { useAuth } from "../contexts/AuthContext";

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="p">
      <h2 className="text-3xl font-bold mb-4">Dashboard</h2>
      <p>
        Welcome back, <strong>{user?.fullName}</strong>! 🎉
      </p>
    </div>
  );
};

export default DashboardPage;
