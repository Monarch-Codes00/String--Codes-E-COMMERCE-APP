import axios from "axios";
import appConfig from "../config/appConfig";

const apiClient = axios.create({
  baseURL: appConfig.API_BASE_URL, // I set baseURL based on env Dynamically.
  headers: {
    "Content-Type": "application/json",
  },
});

// Axios interceptor to attach the token to each request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
