import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.vet-manager-hc.cupscoffee.xyz/api/v0",
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
