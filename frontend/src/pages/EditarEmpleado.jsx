import { useParams, useNavigate } from "react-router";
import { EmployeeForm } from "../components/FormularioEmpleado";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { getEmpleado, updateEmpleado, getNivelesEstudio } from "../utils/empleadosAPI";
import { getRoles } from "../utils/rolesAPI";
import { getSectores } from "../utils/sectoresAPI";

export const EmployeeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [roles, setRoles] = useState([]);
  const [niveles, setNiveles] = useState([]);
  const [sectores, setSectores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resEmpleado, resRoles, resNiveles, resSectores] = await Promise.all([
          getEmpleado(id),
          getRoles(),
          getNivelesEstudio(),
          getSectores(),
        ]);

        // Mapear los datos del empleado al formato del formulario
        const empleadoMapeado = {
          id: resEmpleado.id,
          nombre: resEmpleado.nombre,
          apellido: resEmpleado.apellido,
          dni: resEmpleado.dni,
          legajo: resEmpleado.legajo,
          fechaIngreso: resEmpleado.fechaIngreso?.split('T')[0], // Formato YYYY-MM-DD
          email: resEmpleado.email,
          telefono: resEmpleado.telefono || "",
          sueldo: resEmpleado.sueldo,
          sectorId: resEmpleado.sectorId,
          rolId: resEmpleado.rolId,
          nivelEstudioId: resEmpleado.nivelEstudioId || "",
          supervisorId: resEmpleado.supervisorId || "",
        };

        setEmployee(empleadoMapeado);
        setRoles(resRoles);
        setNiveles(resNiveles);
        setSectores(resSectores.filter(s => s.estaActivo));
      } catch (error) {
        console.error("Error cargando datos:", error);
        setError(error);
        Swal.fire("Error", "No se pudo cargar el empleado", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      const empleado = {
        ...values,
        id: parseInt(id),
        nivelEstudioId: values.nivelEstudioId ? parseInt(values.nivelEstudioId) : null,
        supervisorId: values.supervisorId ? parseInt(values.supervisorId) : null,
        sectorId: parseInt(values.sectorId),
        rolId: parseInt(values.rolId),
        sueldo: parseFloat(values.sueldo),
      };

      await updateEmpleado(id, empleado);
      
      await Swal.fire({
        title: "Éxito",
        text: "Empleado actualizado correctamente",
        icon: "success",
      });
      
      navigate("/administrador/empleados/listado");
    } catch (error) {
      console.error("Error actualizando empleado:", error);
      Swal.fire({
        title: "Error",
        text: error.response?.data || "No se pudo actualizar el empleado",
        icon: "error",
      });
    }
  };

  if (loading) return <div className="text-center my-5">Cargando empleado...</div>;
  if (error) return <div className="alert alert-danger">Error al cargar empleado.</div>;
  if (!employee) return <div className="alert alert-warning">Empleado no encontrado.</div>;

  return (
    <div>
      <EmployeeForm 
        initialValues={employee}  
        roles={roles}
        niveles={niveles}
        sectores={sectores}
        onSubmit={handleSubmit}
        mode="edit" 
      />
    </div>
  );
};