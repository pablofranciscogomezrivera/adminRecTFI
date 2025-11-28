import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://localhost:5187/api",
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

// Interceptor para agregar el token JWT a todas las peticiones
axiosClient.interceptors.request.use(
  (config) => {
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

// Interceptor para manejar errores de autenticación
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // 🟢 CAMBIO: Solo redirigir/limpiar si NO estamos en el login.
      // Esto permite que el componente Login maneje el error y muestre el SweetAlert
      if (window.location.pathname !== "/login") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;