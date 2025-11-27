import { useNavigate } from "react-router-dom";
import { EmployeeForm } from "../components/FormularioEmpleado";
import { useCreateEmployee } from "../hooks/crearEmpleadoHook";
import { obtenerNivelesEstudio, obtenerRoles, obtenerSectores } from "../utils/formularioEmpleadoAPI";
import { useState,useEffect } from "react";
import { useSectors } from "../hooks/obtenerSectoresHook";

export const EmployeeCreate = () => {
  const navigate = useNavigate();
  const { createEmployee, isSubmitting } = useCreateEmployee();
  const [roles, setRoles] = useState([]);
  const [niveles, setNiveles] = useState([]);
  const {sectors}=useSectors();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const resRoles = await obtenerRoles();
      
      const resNiveles = await obtenerNivelesEstudio();

      setRoles(resRoles.data);
      setNiveles(resNiveles.data);
  
      setLoading(false);
    };

    fetchData();
  }, []);


  const handleSubmit = async (values) => {
    await createEmployee(values);
    // mejor mostrar toast y/o navegar
    navigate("/empleados/listar");
  };

  return (
    <div>
      <EmployeeForm
        initialValues={{
          nombre: "", apellido: "", dni_legajo: "", fecha_ingreso: "",
          email: "", sueldo: "", sector: "", rol: "", nivel_estudio: ""
        }}
        roles={roles}
        niveles={niveles}
        sectores={sectors}
        onSubmit={handleSubmit}
        mode="create"
      />
      {isSubmitting && <p>Enviando...</p>}
    </div>
  );
};
