
import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://dummyjson.com/",
});

export default axiosInstance;
axiosInstance.interceptors.request.use(
  (config) => {
    console.log("Request sent:", config);
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);