import axiosClient from "./axiosClient";

/**
 * Get all roles
 * @returns {Promise} List of roles
 */
export const getRoles = async () => {
  try {
    const response = await axiosClient.get("/roles");
    return response.data;
  } catch (error) {
    console.error("Error obteniendo roles:", error);
    throw error;
  }
};

/**
 * Create new role
 * @param {object} role - {nombre: string, descripcion?: string}
 * @returns {Promise}
 */
export const createRole = async (role) => {
  try {
    const response = await axiosClient.post("/roles", role);
    return response.data;
  } catch (error) {
    console.error("Error creando rol:", error);
    throw error;
  }
};

/**
 * Update role
 * @param {number} id 
 * @param {object} role - {nombre: string, descripcion?: string}
 * @returns {Promise}
 */
export const updateRole = async (id, role) => {
  try {
    const response = await axiosClient.put(`/roles/${id}`, role);
    return response.data;
  } catch (error) {
    console.error("Error actualizando rol:", error);
    throw error;
  }
};

/**
 * Delete (deactivate) role
 * @param {number} id 
 * @returns {Promise}
 */
export const deleteRole = async (id) => {
  try {
    const response = await axiosClient.delete(`/roles/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error eliminando rol:", error);
    throw error;
  }
};
