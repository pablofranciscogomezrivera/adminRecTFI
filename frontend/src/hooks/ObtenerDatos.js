import { useState, useEffect } from "react";
import { getEmployeeById } from "../utils/empleadoAPI"

export const useEmployee = (id) => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    setLoading(true);
    getEmployeeById(id)
      .then((res) => {
        if (mounted) setEmployee(res.data);
      })
      .catch((err) => {
        if (mounted) setError(err);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [id]);

  return { employee, loading, error };
};