import apiClient from "./apiClient";

export const fetchOrders = async () => {
  const response = await apiClient.get("/orders");
  return response.data;
};

export const createOrder = async (orderData) => {
  const response = await apiClient.post("/orders", orderData);
  return response.data;
};

export const fetchOrderById = async (orderId) => {
  const response = await apiClient.get(`/orders/${orderId}`);
  return response.data;
};
