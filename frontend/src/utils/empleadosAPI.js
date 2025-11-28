import axiosClient from "./axiosClient";

/**
 * Get all employees with filters and pagination
 * @param {object} params - {search, sectorId, pagina, itemsPorPagina}
 * @returns {Promise}
 */
export const getEmpleados = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams();
    
    if (params.search) queryParams.append("search", params.search);
    if (params.sectorId) queryParams.append("sectorId", params.sectorId);
    if (params.pagina) queryParams.append("pagina", params.pagina);
    if (params.itemsPorPagina) queryParams.append("itemsPorPagina", params.itemsPorPagina);
    
    const response = await axiosClient.get(`/empleados?${queryParams.toString()}`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo empleados:", error);
    throw error;
  }
};

/**
 * Get employee by ID
 * @param {number} id 
 * @returns {Promise}
 */
export const getEmpleado = async (id) => {
  try {
    const response = await axiosClient.get(`/empleados/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo empleado:", error);
    throw error;
  }
};

/**
 * Create new employee
 * @param {object} empleado 
 * @returns {Promise}
 */
export const createEmpleado = async (empleado) => {
  try {
    const response = await axiosClient.post("/empleados", empleado);
    return response.data;
  } catch (error) {
    console.error("Error creando empleado:", error);
    throw error;
  }
};

/**
 * Update employee
 * @param {number} id 
 * @param {object} empleado 
 * @returns {Promise}
 */
export const updateEmpleado = async (id, empleado) => {
  try {
    const response = await axiosClient.put(`/empleados/${id}`, empleado);
    return response.data;
  } catch (error) {
    console.error("Error actualizando empleado:", error);
    throw error;
  }
};

/**
 * Deactivate employee (desvinculación)
 * @param {number} id 
 * @param {string} fechaEgreso - Format: YYYY-MM-DD
 * @returns {Promise}
 */
export const desvincularEmpleado = async (id, fechaEgreso) => {
  try {
    const response = await axiosClient.post(`/empleados/${id}/desvincular`, {
      fechaEgreso,
    });
    return response.data;
  } catch (error) {
    console.error("Error desvinculando empleado:", error);
    throw error;
  }
};

/**
 * Get supervisors (employees with Supervisor or Gerente roles)
 * @returns {Promise}
 */
export const getSupervisores = async () => {
  try {
    const response = await axiosClient.get("/empleados/supervisores");
    return response.data;
  } catch (error) {
    console.error("Error obteniendo supervisores:", error);
    throw error;
  }
};

/**
 * Get niveles de estudio
 * @returns {Promise}
 */
export const getNivelesEstudio = async () => {
  try {
    const response = await axiosClient.get("/niveles-estudio");
    return response.data;
  } catch (error) {
    console.error("Error obteniendo niveles de estudio:", error);
    throw error;
  }
};
