import { useState, useEffect } from "react";
import { getEmployees } from "../utils/empleadoAPI";

export const useEmployees = (params = {}) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getEmployees(params);
      console.log(res.data);
      setEmployees(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(params)]); // re-run si cambian params

  return { employees, loading, error, reload: load };
};