import apiClient from "./apiClient";

export const fetchCart = async () => {
  const response = await apiClient.get("/cart");
  return response.data;
};

export const addToCart = async (productId, quantity) => {
  const response = await apiClient.post("/cart", { productId, quantity });
  return response.data;
};

export const updateCartItem = async (productId, quantity) => {
  const response = await apiClient.put(`/cart/${productId}`, { quantity });
  return response.data;
};

export const removeCartItem = async (productId) => {
  const response = await apiClient.delete(`/cart/${productId}`);
  return response.data;
};

export const clearCart = async () => {
  const response = await apiClient.delete("/cart");
  return response.data;
};
