import { Link } from "react-router-dom";
import { useEmployees } from "../hooks/listarEmpleadoHook";

export const EmployeeList = () => {
  const { employees, loading, error, reload } = useEmployees();

  return (
    <div>
      <h1>Empleados</h1>

     
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>Error al cargar empleados.</p>}
      <button onClick={reload}>Refrescar</button>
      <ul>
        {employees.map((emp) => (
          <li key={emp.id} style={{ marginBottom: 8 }}>
            <strong>{emp.name}</strong> — {emp.position} — {emp.email}{" "}
            <Link to={`/edit/${emp.id}`}>Editar</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};