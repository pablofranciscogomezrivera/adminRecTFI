import { Link } from "react-router-dom";
import { useEmployees } from "../hooks/listarEmpleadoHook";
import { useDesactivateEmployee } from "../hooks/DesactivarEmpleado";

export const EmployeeList = () => {
  const { employees, loading, error, reload } = useEmployees();
const { desactivate } = useDesactivateEmployee();


const handleDesactivate = async (emp) => {
    const exitDate = prompt("Ingrese fecha de egreso (YYYY-MM-DD):");

    if (!exitDate) return;

    await desactivate(emp.id, exitDate);
    reload(); // actualizar lista y ocultar al empleado
  };



  return (
    <div>
      <h1>Empleados</h1>

     
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>Error al cargar empleados.</p>}
      <button onClick={reload}>Refrescar</button>
      <ul>
        {employees.map((emp) => (
          <li key={emp.id} style={{ marginBottom: 8 }}>
            <strong>{emp.nombre}</strong> — {emp.rol.descripcion} — {emp.email}{" "}
            <Link to={`/edit/${emp.id}`}>Editar</Link>
            <button onClick={() => handleDesactivate(emp)}>Desactivar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};