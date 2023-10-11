import axios from "axios";

const apiClient = axios.create({
  baseURL: `https://relieved-frock-hen.cyclic.app/api`,
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response.data.err),
);

export default apiClient;
