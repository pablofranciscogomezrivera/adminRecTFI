import { useState } from "react";
import { createEmployee } from "../utils/empleadoAPI";

export const useCreateEmployee = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const create = async (payload) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await createEmployee(payload);
      return res.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { createEmployee: create, isSubmitting, error };
};
