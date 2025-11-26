import { useNavigate } from "react-router-dom";
import { EmployeeForm } from "./configuraciones/FormularioEmpleado";
import { useCreateEmployee } from "../hooks/crearEmpleadoHook";

export const EmployeeCreate = () => {
  const navigate = useNavigate();
  const { createEmployee, isSubmitting } = useCreateEmployee();

  const handleSubmit = async (values) => {
    await createEmployee(values);
    // mejor mostrar toast y/o navegar
   // navigate("/");
  };

  return (
    <div>
      <EmployeeForm
        initialValues={{ name: "", email: "", position: "" }}
        onSubmit={handleSubmit}
        mode="create"
      />
      {isSubmitting && <p>Enviando...</p>}
    </div>
  );
};
