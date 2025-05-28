import apiClient from "./apiClient";

export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post("/users/register", userData);

    const { message, data } = response.data;

    return {
      message,
      user: { fullName: data.fullName, email: data.email, id: data._id },
    };
  } catch (error) {
    throw error.response?.data?.message || "Registration failed";
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post("/users/login", credentials);
    const { message, token, userFound } = response.data;
    return {
      message,
      token,
      user: {
        fullName: userFound.fullName,
        email: userFound.email,
        id: userFound._id,
        createdAt: userFound.createdAt,
        isAdmin: userFound.isAdmin,

        ShippingAddress: userFound.hasShippingAddress,
      },
    };
  } catch (error) {
    throw error.response?.data?.message || "Login failed";
  }
};

export const updateShippingAddress = async (addressData) => {
  try {
    const response = await apiClient.put("/users/update-address", addressData);
    const { message, user } = response.data;
    return { message, user };
  } catch (error) {
    throw error.response?.data?.message || "Failed to update shipping address";
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await apiClient.delete(`/users/${userId}`);
    const { message } = response.data;
    return message;
  } catch (error) {
    throw error.response?.data?.message || "Failed to delete user";
  }
};
