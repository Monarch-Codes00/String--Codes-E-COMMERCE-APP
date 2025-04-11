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
        ShippingAddress: userFound.hasShippingAddress,
      },
    };
  } catch (error) {
    throw error.response?.data?.message || "Login failed";
  }
};
