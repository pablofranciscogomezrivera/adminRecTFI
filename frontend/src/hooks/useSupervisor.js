import { useEffect, useState } from "react";
import { getSupervisores } from "../utils/empleadoAPI";

export const useSupervisores = () => {
  const [supervisores, setSupervisores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSupervisores()
      .then(res => setSupervisores(res.data))
      .finally(() => setLoading(false));
  }, []);

  return { supervisores, loading };
};