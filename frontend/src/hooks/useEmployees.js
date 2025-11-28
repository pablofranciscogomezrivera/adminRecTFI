import { useState, useEffect } from "react";
import { getEmpleados } from "../utils/empleadoAPI";

export function useEmployees({ search, sector, page }) {
  const [data, setData] = useState([]); 
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      setIsLoading(true);
      try {
        const res = await getEmpleados({ search, sector, page });
        setData(res); // el backend devuelve un array directamente
      } catch (error) {
        console.error("Error fetching employees:", error);
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployees();
  }, [search, sector, page]);

  return { data, isLoading };
}