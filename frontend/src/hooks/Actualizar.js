import { useState } from "react";
import { updateEmployee } from "../utils/empleadoAPI";

export const useUpdateEmployee = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const update = async (id, payload) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await updateEmployee(id, payload);
      return res.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { updateEmployee: update, isSubmitting, error };
};