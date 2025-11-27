
import { useParams, useNavigate } from "react-router-dom";
import { EmployeeForm } from "../components/FormularioEmpleado";
import { useEmployee } from "../hooks/ObtenerDatos";
import { useUpdateEmployee } from "../hooks/Actualizar";
import { obtenerRoles } from "../utils/formularioEmpleadoAPI";
import { obtenerSectores } from "../utils/formularioEmpleadoAPI";
import { obtenerNivelesEstudio } from "../utils/formularioEmpleadoAPI";
import { useState,useEffect } from "react";

export const EmployeeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employee, loading, error } = useEmployee(id);
  const { updateEmployee, isSubmitting } = useUpdateEmployee();
   const [roles, setRoles] = useState([]);
    const [niveles, setNiveles] = useState([]);
    const [sectores, setSectores] = useState([]);
    
  
    useEffect(() => {
      const fetchData = async () => {
        const resRoles = await obtenerRoles();
        const resNiveles = await obtenerSectores();
        const resSectores = await obtenerNivelesEstudio();
  
        setRoles(resRoles.data);
        setNiveles(resNiveles.data);
        setSectores(resSectores.data);
        
      };
  
      fetchData();
    }, []);
  

  if (loading) return <p>Cargando empleado...</p>;
  if (error) return <p>Error al cargar empleado.</p>;
  if (!employee) return <p>Empleado no encontrado.</p>;

  const handleSubmit = async (values) => {
    await updateEmployee(id, values);
navigate("/");
  };

  return (
    <div>
      <EmployeeForm initialValues={employee}  
        roles={roles}
        niveles={niveles}
        sectores={sectores}
        onSubmit={handleSubmit}
       mode="edit" />
      {isSubmitting && <p>Guardando cambios...</p>}
    </div>
  );
};