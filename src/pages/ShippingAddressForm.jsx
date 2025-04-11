import { useState, useEffect } from "react";
import { updateShippingAddress } from "../services/userService";
import toast from "react-hot-toast";
import "../components/styles/ShippingAddressForm.css";

/**
 * ShippingAddressForm Component
 * Allows a logged-in user to add or update their shipping address.
 * If the user has an existing shipping address, the form fields will be pre-filled.
 *
 * Props:
 * - user: The current user object.
 * - login: Function from AuthContext to update the user.
 * - setShowForm: Function to toggle the visibility of this form.
 */
const ShippingAddressForm = ({ user, login, setShowForm }) => {
  // Create a helper to compute initial values
  const getInitialData = () => {
    if (user && user.shippingAddress) {
      return {
        firstName: user.shippingAddress.firstName || "",
        lastName: user.shippingAddress.lastName || "",
        address: user.shippingAddress.address || "",
        city: user.shippingAddress.city || "",
        postalCode: user.shippingAddress.postalCode || "",
        state: user.shippingAddress.state || "",
        country: user.shippingAddress.country || "",
        phone: user.shippingAddress.phone || "",
      };
    }
    return {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      postalCode: "",
      state: "",
      country: "",
      phone: "",
    };
  };

  // Initialize form data with the user's shipping address if it exists
  const [formData, setFormData] = useState(getInitialData);

  // Update form data if the user or user's shipping address changes
  useEffect(() => {
    setFormData(getInitialData());
  }, [user]);

  // Handle changes for each input field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { message, user: updatedUser } = await updateShippingAddress(formData);
      
      // Update global user context with new shipping data
      login(updatedUser);
      
      toast.success(message);
      setShowForm(false);  // Hide the form after successful update
    } catch (err) {
      const errorMessage = typeof err === "string" ? err : err.message;
      toast.error(errorMessage);
      console.error(err);
    }
  };

  return (
    <form className="shipping-form" onSubmit={handleSubmit}>
      <h2>{user?.hasShippingAddress ? "Update" : "Add"} Shipping Address</h2>
      {["firstName", "lastName", "address", "city", "postalCode", "state", "country", "phone"].map((field) => (
        <input
          key={field}
          name={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={formData[field]}
          onChange={handleChange}
          required
          className="shipping-input"
        />
      ))}
      <button type="submit" className="shipping-submit">
        Save Address
      </button>
    </form>
  );
};

export default ShippingAddressForm;
