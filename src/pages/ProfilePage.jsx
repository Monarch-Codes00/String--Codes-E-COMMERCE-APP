import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { updateUser } from "../services/userService"; // Update user service function

const ProfilePage = () => {
  const { user, setUser } = useAuth(); // Getting current user data from context
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName,
        email: user.email,
      });
    }
  }, [user]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission to update user data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await updateUser(formData); // Call API to update user
      setUser(updatedUser); // Update user in context
      alert("Profile updated successfully!"); // Show success message
    } catch (error) {
      alert("Error updating profile.");
    }
  };

  return (
    <div className="profile-page">
      <h2 className="profile-title">Profile</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="update-button">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
