import axios from "axios";

const apiClient = axios.create({
  // baseURL: `${import.meta.env.VITE_BASE_URL}`,
  baseURL: `http://localhost:5001/api`,
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response.data.err),
);

export default apiClient;
