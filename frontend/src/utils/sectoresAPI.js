import axiosClient from "./axiosClient";

/**
 * Get all sectores
 * @returns {Promise} List of sectores
 */
export const getSectores = async () => {
  try {
    const response = await axiosClient.get("/sectores");
    return response.data;
  } catch (error) {
    console.error("Error obteniendo sectores:", error);
    throw error;
  }
};

/**
 * Create new sector
 * @param {object} sector - {nombre: string}
 * @returns {Promise}
 */
export const createSector = async (sector) => {
  try {
    const response = await axiosClient.post("/sectores", sector);
    return response.data;
  } catch (error) {
    console.error("Error creando sector:", error);
    throw error;
  }
};

/**
 * Update sector
 * @param {number} id 
 * @param {object} sector - {nombre: string}
 * @returns {Promise}
 */
export const updateSector = async (id, sector) => {
  try {
    const response = await axiosClient.put(`/sectores/${id}`, sector);
    return response.data;
  } catch (error) {
    console.error("Error actualizando sector:", error);
    throw error;
  }
};

/**
 * Delete (deactivate) sector
 * @param {number} id 
 * @returns {Promise}
 */
export const deleteSector = async (id) => {
  try {
    const response = await axiosClient.delete(`/sectores/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error eliminando sector:", error);
    throw error;
  }
};

/**
 * Activate sector
 * @param {number} id 
 * @returns {Promise}
 */
export const activateSector = async (id) => {
  try {
    const response = await axiosClient.put(`/sectores/${id}/activar`);
    return response.data;
  } catch (error) {
    console.error("Error activando sector:", error);
    throw error;
  }
};