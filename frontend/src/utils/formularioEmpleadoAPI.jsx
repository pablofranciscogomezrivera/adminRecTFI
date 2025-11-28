import axiosClient from "./axiosClient";

const PATH_ROL = "/roles"; // ajustar según el backend
const PATH_SECTOR = "/sectores";
const PATH_NIVEL_ESTUDIO="/nivel_estudio";


export const obtenerRoles = () => axiosClient.get(PATH_ROL);
export const obtenerSectores = () => axiosClient.get(PATH_SECTOR);
export const obtenerNivelesEstudio = () => axiosClient.get(PATH_NIVEL_ESTUDIO);