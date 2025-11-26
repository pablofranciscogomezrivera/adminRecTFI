import axiosClient from "./axiosClient";

const PATH = "/empleados"; // ajustar según el backend


export const createEmployee = (payload) => axiosClient.post(PATH, payload);
export const getEmployees = (params = {}) => axiosClient.get(PATH, { params });
export const getEmployeeById = (id) => axiosClient.get(`${PATH}/${id}`);
export const updateEmployee = (id, payload) => axiosClient.put(`${PATH}/${id}`, payload);