import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 403) {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const { data } = await axios.post(
            `${API_BASE_URL}/auth/refresh`,
            {},
            { headers: { Authorization: `Bearer ${refreshToken}` } }
          );
          localStorage.setItem("token", data.access_token);
          error.config.headers.Authorization = `Bearer ${data.access_token}`;
          return axiosInstance.request(error.config);
        } catch (refreshError) {
          console.log("Error refrescando el token: ", refreshError);
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          window.location.href = "/";
        }
      }
    }
    return Promise.reject(error);
  }
);
