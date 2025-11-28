import axiosClient from "./axiosClient";

/**
 * Login user with email and password
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise} Response with token
 */
export const loginUser = async (email, password) => {
  try {
    const response = await axiosClient.post("/auth/login", {
      email,
      password,
    });
    
    // El backend retorna { token: "..." }
    const { token } = response.data;
    
    // Guardamos el token
    localStorage.setItem("token", token);
    
    // Decodificamos el JWT para obtener la información del usuario
    const user = decodeToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    
    return { token, user };
  } catch (error) {
    console.error("Error en login:", error);
    throw error;
  }
};

/**
 * Register a new user (only for admins or initial setup)
 * @param {number} empleadoId 
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise}
 */
export const registerUser = async (empleadoId, email, password) => {
  try {
    const response = await axiosClient.post("/auth/register", {
      empleadoId,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error en registro:", error);
    throw error;
  }
};

/**
 * Logout user - clear tokens and user data
 */
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  sessionStorage.removeItem("usuarioKey");
};

/**
 * Get current user from localStorage
 * @returns {object|null} User object or null
 */
export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }
  return null;
};

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;
  
  try {
    const user = decodeToken(token);
    // Verificar si el token no ha expirado
    if (user.exp && user.exp * 1000 < Date.now()) {
      logoutUser();
      return false;
    }
    return true;
  } catch {
    return false;
  }
};

/**
 * Decode JWT token to get user info
 * @param {string} token 
 * @returns {object} Decoded token payload
 */
function decodeToken(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    
    const payload = JSON.parse(jsonPayload);
    
    // Mapear los claims del JWT a un formato más amigable
    return {
      id: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
      email: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
      role: payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || "Empleado",
      exp: payload.exp,
    };
  } catch (error) {
    console.error("Error decodificando token:", error);
    throw new Error("Token inválido");
  }
}
