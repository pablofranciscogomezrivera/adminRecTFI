import { useState } from "react";
import { useEmployees } from "../hooks/useEmployees";
import { useSectors } from "../hooks/obtenerSectoresHook";
import { Link } from "react-router";
import { useDesactivateEmployee } from "../hooks/DesactivarEmpleado";


export function ListarEmpleados() {
  const [search, setSearch] = useState("");
  const [sector, setSector] = useState("");
  const [page, setPage] = useState(1);
  const { desactivate } = useDesactivateEmployee();

  const { data: empleados } = useEmployees({ search, sector, page });
  const { sectors } = useSectors();

const handleDesactivate = async (emp) => {
    const exitDate = prompt("Ingrese fecha de egreso (YYYY-MM-DD):");

    if (!exitDate) return;

    await desactivate(emp.id, exitDate);
    reload(); // actualizar lista y ocultar al empleado
  };
  return (
    <div>
      <h1>Empleados</h1>

      {/* Buscador */}
      <input
        type="text"
        placeholder="Buscar nombre, apellido o legajo"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Filtro sector */}
      <select value={sector} onChange={(e) => setSector(e.target.value)}>
        <option value="">Todos los sectores</option>
        {sectors.map(sec => (
          <option key={sec.id} value={sec.descripcion}>
            {sec.descripcion}
          </option>
        ))}
      </select>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Legajo</th>
            <th>Rol</th>
            <th>Sector</th>
            <th>Supervisor</th>
          </tr>
        </thead>

        <tbody>
          {(empleados ?? []).map(emp => (
            <tr key={emp.id}>
              <td>{emp.nombre} {emp.apellido}</td>
              <td>{emp.dni_legajo}</td>
              <td>{emp.rol}</td>
              <td>{emp.sector}</td>
              <td>{emp.supervisor ?? "-"}</td>
              <td><Link to={`/administrador/empleados/editar/${emp.id}`}>Editar</Link></td>
              
              <td><button onClick={() => handleDesactivate(emp)}>Desactivar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
