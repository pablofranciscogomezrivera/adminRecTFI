import axiosClient from "./axiosClient";

const PATH = "/empleados"; // ajustar según el backend


export const createEmployee = (payload) => axiosClient.post(PATH, payload);
export const getEmployees = (params = {}) => axiosClient.get(PATH, { params });