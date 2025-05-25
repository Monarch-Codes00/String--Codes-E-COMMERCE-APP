import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import "../components/styles/Profile.css";

const Profile = () => {
  const { user, logout, deleteAccount } = useAuth();

  const [editingPersonal, setEditingPersonal] = useState(false);
  const [editingLogin, setEditingLogin] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    fullName: user?.fullName || "",
    phone: user?.phone || "",
    dob: user?.dob || "",
    gender: user?.gender || "",
  });
  const [loginInfo, setLoginInfo] = useState({
    email: user?.email || "",
    password: "**********",
  });
  const [orders, setOrders] = useState([]);
  const [activeSection, setActiveSection] = useState("Personal Information");

  useEffect(() => {
    const storedOrders = localStorage.getItem("userOrders");
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, []);

  const handlePersonalChange = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    logout();
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      deleteAccount();
    }
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">Account Overview</h1>
      <div className="profile-content">
        <nav className="profile-sidebar">
          <ul>
            <li
              className={activeSection === "Personal Information" ? "active" : ""}
              onClick={() => setActiveSection("Personal Information")}
            >
              Personal Information
            </li>
            <li
              className={activeSection === "Address Book" ? "active" : ""}
              onClick={() => setActiveSection("Address Book")}
            >
              Address Book
            </li>
            <li
              className={activeSection === "Order" ? "active" : ""}
              onClick={() => setActiveSection("Order")}
            >
              Order
            </li>
            {/* Wishlist section excluded as per user request */}
            <li onClick={handleLogout} className="logout-link">
              Logout
            </li>
          </ul>
        </nav>
        <main className="profile-main">
          {activeSection === "Personal Information" && (
            <section className="personal-info-section">
              <h2>Personal Information</h2>
              {editingPersonal ? (
                <div className="edit-form">
                  <label>
                    Full Name
                    <input
                      type="text"
                      name="fullName"
                      value={personalInfo.fullName}
                      onChange={handlePersonalChange}
                    />
                  </label>
                  <label>
                    Phone Number
                    <input
                      type="text"
                      name="phone"
                      value={personalInfo.phone}
                      onChange={handlePersonalChange}
                    />
                  </label>
                  <label>
                    Date of Birth
                    <input
                      type="date"
                      name="dob"
                      value={personalInfo.dob}
                      onChange={handlePersonalChange}
                    />
                  </label>
                  <label>
                    Gender
                    <select
                      name="gender"
                      value={personalInfo.gender}
                      onChange={handlePersonalChange}
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </label>
                  <button onClick={() => setEditingPersonal(false)}>Save</button>
                </div>
              ) : (
                <div className="info-display">
                  <p>
                    <strong>{personalInfo.fullName}</strong>
                  </p>
                  <p>Phone Number: {personalInfo.phone}</p>
                  <p>Date of Birth: {personalInfo.dob}</p>
                  <p>Gender: {personalInfo.gender}</p>
                  <button
                    className="edit-button"
                    onClick={() => setEditingPersonal(true)}
                  >
                    Edit
                  </button>
                </div>
              )}
            </section>
          )}

          {activeSection === "Address Book" && (
            <section className="address-book-section">
              <h2>Address Book</h2>
              <p>Manage your shipping addresses here.</p>
              {/* Implement address management UI as needed */}
            </section>
          )}

          {activeSection === "Order" && (
            <section className="order-section">
              <h2>Order History</h2>
              {orders.length === 0 ? (
                <p>No orders found.</p>
              ) : (
                <ul className="order-list">
                  {orders.map((order, index) => (
                    <li key={index} className="order-item">
                      <p>
                        <strong>Order ID:</strong> {order.id || "N/A"}
                      </p>
                      <p>
                        <strong>Date Ordered:</strong>{" "}
                        {order.date ? new Date(order.date).toLocaleDateString() : "N/A"}
                      </p>
                      <p>
                        <strong>Estimated Arrival:</strong>{" "}
                        {order.date
                          ? new Date(new Date(order.date).getTime() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()
                          : "N/A"}
                      </p>
                      <p>
                        <strong>Total:</strong> ${order.total ? order.total.toFixed(2) : "0.00"}
                      </p>
                      <p>
                        <strong>Items:</strong>
                      </p>
                      <ul className="order-items-list">
                        {order.items && order.items.length > 0 ? (
                          order.items.map((item, idx) => (
                            <li key={idx} className="order-item-detail">
                              <img
                                src={item.image || "/placeholder.png"}
                                alt={item.name}
                                className="order-item-image"
                              />
                              <div className="order-item-info">
                                <p>{item.name}</p>
                                <p>Quantity: {item.quantity}</p>
                                <p>Price: ${item.price.toFixed(2)}</p>
                              </div>
                            </li>
                          ))
                        ) : (
                          <p>No items found</p>
                        )}
                      </ul>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}

          <section className="account-management-section">
            <h3>Log out from all web browsers</h3>
            <p>
              This will log you out from all web browsers you have used to access
              the website. To log in again, you'll have to enter your credentials.
            </p>
            <button className="logout-button" onClick={handleLogout}>
              Log me out
            </button>

            <h3>Manage Account</h3>
            <button className="delete-account-button" onClick={handleDeleteAccount}>
              Delete Account
            </button>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Profile;
