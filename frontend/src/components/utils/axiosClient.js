import axios from "axios";

const axiosClient = axios.create({
  //baseURL: process.env.REACT_APP_API_URL || "http://localhost:4000/",
  baseURL: "http://localhost:4000/",
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

// Ejemplo de interceptor (opcional) para auth / logging
// axiosClient.interceptors.request.use(config => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

 export default axiosClient;