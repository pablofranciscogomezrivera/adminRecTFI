import axiosClient from "./axiosClient";

/**
 * Get dotacion report data (JSON)
 * @returns {Promise}
 */
export const getReporteDotacion = async () => {
  try {
    const response = await axiosClient.get("/reportes/dotacion");
    return response.data;
  } catch (error) {
    console.error("Error obteniendo reporte de dotación:", error);
    throw error;
  }
};

/**
 * Get dotacion report as PDF (downloads file)
 * @returns {Promise}
 */
export const downloadReportePDF = async () => {
  try {
    const response = await axiosClient.get("/reportes/dotacion/pdf", {
      responseType: "blob",
    });
    
    // Create a download link for the PDF
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "ReporteDotacion.pdf");
    document.body.appendChild(link);
    link.click();
    link.remove();
    
    return response.data;
  } catch (error) {
    console.error("Error descargando PDF:", error);
    throw error;
  }
};
