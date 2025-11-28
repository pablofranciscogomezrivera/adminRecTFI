import { Link } from "react-router";
import { useState } from "react";

function MenuEmpleados() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <button onClick={() => setOpen(!open)}>
        Gestionar empleados
      </button>

      {open && (
        <div style={{
          position: "absolute",
          background: "white",
          border: "1px solid #ccc",
          padding: "10px"
        }}>
          <ul>
           <li><Link to="/administrador/empleados/alta">Alta de empleado</Link></li>
            <li><Link to="/administrador/empleados/editar/1">Modificación (Ejemplo)</Link></li>
            <li><Link to="/administrador/empleados/listado">Listar Empleados</Link></li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default MenuEmpleados;