import { useState } from "react";
import { desactivateEmployee } from "../utils/empleadoAPI"

export const useDesactivateEmployee = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const desactivate = async (id, exitDate) => {
    setLoading(true);
    setError(null);

    try {
      const res = await desactivateEmployee(id, exitDate);
      return res.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { desactivate, loading, error };
};