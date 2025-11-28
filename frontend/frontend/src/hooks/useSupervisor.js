import { useEffect, useState } from "react";
import { getSupervisores } from "../utils/empleadosAPI";

export const useSupervisores = () => {
  const [supervisores, setSupervisores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSupervisores = async () => {
      try {
        const data = await getSupervisores();
        setSupervisores(data);
      } catch (error) {
        console.error("Error cargando supervisores:", error);
        setSupervisores([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSupervisores();
  }, []);

  return { supervisores, loading };
};