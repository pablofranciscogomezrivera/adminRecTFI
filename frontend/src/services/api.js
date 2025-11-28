// API Configuration
const API_BASE_URL = 'http://localhost:5187/api';

/**
 * Helper function to get the auth token from localStorage
 */
const getAuthToken = () => {
  return localStorage.getItem('token');
};

/**
 * Helper function to make API requests with proper headers
 */
const apiRequest = async (endpoint, options = {}) => {
  const token = getAuthToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  
  // Handle different response statuses
  if (response.status === 401) {
    // Unauthorized - user needs to login
    throw new Error('No autorizado. Por favor, inicie sesión.');
  }
  
  if (response.status === 403) {
    // Forbidden - user doesn't have permission
    throw new Error('No tiene permisos para realizar esta acción.');
  }

  // For 204 No Content responses
  if (response.status === 204) {
    return null;
  }

  // Try to parse JSON response
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    // If the server returned an error message, use it
    const errorMessage = typeof data === 'string' 
      ? data 
      : data?.message || data?.title || `Error: ${response.status}`;
    throw new Error(errorMessage);
  }

  return data;
};

/**
 * Sectores API
 */
export const sectoresApi = {
  // GET /api/sectores - Get all sectors
  getAll: async () => {
    return await apiRequest('/sectores', {
      method: 'GET',
    });
  },

  // POST /api/sectores - Create a new sector
  create: async (sector) => {
    return await apiRequest('/sectores', {
      method: 'POST',
      body: JSON.stringify(sector),
    });
  },

  // PUT /api/sectores/{id} - Update a sector
  update: async (id, sector) => {
    return await apiRequest(`/sectores/${id}`, {
      method: 'PUT',
      body: JSON.stringify(sector),
    });
  },

  // DELETE /api/sectores/{id} - Soft delete a sector
  delete: async (id) => {
    return await apiRequest(`/sectores/${id}`, {
      method: 'DELETE',
    });
  },
};
