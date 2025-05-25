import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import "../components/styles/Profile.css";

const ShippingAddressForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "United States",
    state: "",
    postalCode: "",
    address: "",
    city: "",
  });

  useEffect(() => {
    const savedData = localStorage.getItem("shippingAddressForm");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    localStorage.setItem("shippingAddressForm", JSON.stringify(formData));
    alert("Shipping address saved.");
  };

  const handleCancel = () => {
    const savedData = localStorage.getItem("shippingAddressForm");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        country: "United States",
        state: "",
        postalCode: "",
        address: "",
        city: "",
      });
    }
  };

  return (
    <div className="shipping-address-form">
      <h3>Billing address</h3>
      <div className="form-row">
        <div className="form-group">
          <label>First name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First name"
          />
        </div>
        <div className="form-group">
          <label>Last name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last name"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email address"
          />
        </div>
        <div className="form-group">
          <label>Phone number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone number"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Country</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
          >
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="United Kingdom">United Kingdom</option>
            {/* Add more countries as needed */}
          </select>
        </div>
        <div className="form-group">
          <label>State/Province</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="State/Province"
          />
        </div>
        <div className="form-group">
          <label>Postal code</label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            placeholder="Postal code"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
          />
        </div>
        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="button" onClick={handleCancel} className="cancel-button">
          Cancel
        </button>
        <button type="button" onClick={handleSave} className="continue-button">
          Continue
        </button>
      </div>
    </div>
  );
};

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
              <ShippingAddressForm />
            </section>
          )}

          {activeSection === "Order" && (
            <section className="order-section">
              <h2>Order History</h2>
              {orders.length === 0 ? (
                <p>No orders found.</p>
              ) : (
                <div className="order-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
                  {orders.map((order, index) => (
                    <div key={index} className="order-item" style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
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
                              {/* Image removed as per user request */}
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
                    </div>
                  ))}
                </div>
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
