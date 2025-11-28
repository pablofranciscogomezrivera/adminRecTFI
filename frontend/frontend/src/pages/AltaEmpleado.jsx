import { useNavigate } from "react-router-dom";
import { EmployeeForm } from "../components/FormularioEmpleado";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { createEmpleado, getNivelesEstudio } from "../utils/empleadosAPI";
import { getRoles } from "../utils/rolesAPI";
import { getSectores } from "../utils/sectoresAPI";

export const EmployeeCreate = () => {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [niveles, setNiveles] = useState([]);
  const [sectores, setSectores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resRoles, resNiveles, resSectores] = await Promise.all([
          getRoles(),
          getNivelesEstudio(),
          getSectores(),
        ]);

        setRoles(resRoles);
        setNiveles(resNiveles);
        setSectores(resSectores.filter(s => s.estaActivo));
      } catch (error) {
        Swal.fire("Error", "No se pudieron cargar los datos del formulario", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (values) => {
    try {
      // Convertir valores vacíos a null para campos opcionales
      const empleado = {
        ...values,
        nivelEstudioId: values.nivelEstudioId ? parseInt(values.nivelEstudioId) : null,
        supervisorId: values.supervisorId ? parseInt(values.supervisorId) : null,
        sectorId: parseInt(values.sectorId),
        rolId: parseInt(values.rolId),
        sueldo: parseFloat(values.sueldo),
      };

      await createEmpleado(empleado);
      
      await Swal.fire({
        title: "Éxito",
        text: "Empleado creado correctamente",
        icon: "success",
      });
      
      navigate("/administrador/empleados/listado");
    } catch (error) {
      console.error("Error creando empleado:", error);
      Swal.fire({
        title: "Error",
        text: error.response?.data || "No se pudo crear el empleado",
        icon: "error",
      });
    }
  };

  if (loading) {
    return <div className="text-center my-5">Cargando formulario...</div>;
  }

  return (
    <div>
      <EmployeeForm
        roles={roles}
        niveles={niveles}
        sectores={sectores}
        onSubmit={handleSubmit}
        mode="create"
      />
    </div>
  );
};
