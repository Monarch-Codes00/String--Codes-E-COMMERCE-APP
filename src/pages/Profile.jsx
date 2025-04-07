import { useAuth } from "../contexts/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Profile Page</h2>
      <p>
        <strong>Full Name:</strong> {user?.fullName}
      </p>
      <p>
        <strong>Email:</strong> {user?.email}
      </p>
      <p>
        <strong>ID:</strong> {user?._id}
      </p>
    </div>
  );
};

export default Profile;
