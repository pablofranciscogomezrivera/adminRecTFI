import { useState, useEffect } from "react";
import { obtenerSectores } from "../utils/formularioEmpleadoAPI";

export function useSectors() {
  const [sectors, setSectors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSectors = async () => {
      setIsLoading(true);
      try {
        const res = await obtenerSectores();
        setSectors(res.data);
      } catch (error) {
        console.error("Error fetching sectors", error);
        setSectors([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSectors();
  }, []);

  return { sectors, isLoading };
}