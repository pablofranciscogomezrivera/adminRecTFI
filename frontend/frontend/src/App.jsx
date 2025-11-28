import { BrowserRouter, Routes, Route } from "react-router";
import { useState, useEffect } from "react";

import Inicio from "./pages/Inicio";
import Login from "./components/pages/Login";
import Register from "./pages/Register";
import Administrador from "./pages/Administrador";
import Usuario from "./components/pages/Usuario";
import Dashboard from "./pages/Dashboard";

import Configuracion from "./pages/Configuracion";
import Sectores from "./pages/configuraciones/Sectores";
import Roles from "./components/pages/configuraciones/Roles";

import { EmployeeCreate } from "./pages/AltaEmpleado";
import { EmployeeEdit } from "./pages/EditarEmpleado";
import { ListarEmpleados } from "./pages/ListarEmpleados";

import ProtectorRutas from "./components/routes/ProtectorRutas";
import Menu from "./components/shared/Menu";
import Footer from "./components/shared/Footer";

function App() {
  const usuarioSessionStorage =
    JSON.parse(sessionStorage.getItem("usuarioKey")) || null;

  const [usuarioLogueado, setUsuarioLogueado] = useState(usuarioSessionStorage);

  useEffect(() => {
    if (usuarioLogueado) {
      sessionStorage.setItem("usuarioKey", JSON.stringify(usuarioLogueado));
    } else {
      sessionStorage.removeItem("usuarioKey");
    }
  }, [usuarioLogueado]);

  return (
    <BrowserRouter>
      <Menu usuarioLogueado={usuarioLogueado} setUsuarioLogueado={setUsuarioLogueado} />

      <div className="app-container">
        <main className="main-content">
          <Routes>

            {/* Rutas públicas */}
            <Route path="/" element={<Inicio />} />
            <Route path="/login" element={<Login setUsuarioLogueado={setUsuarioLogueado} />} />
            <Route path="/register" element={<Register />} />

            {/* Ruta protegida admin */}
            <Route
              path="/administrador/*"
              element={<ProtectorRutas usuarioLogueado={usuarioLogueado} rolPermitido="admin" />}
            >
              <Route index element={<Administrador />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="configuracion" element={<Configuracion />} />
              <Route path="configuracion/sectores" element={<Sectores />} />
              <Route path="configuracion/roles" element={<Roles />} />

              <Route path="empleados/alta" element={<EmployeeCreate />} />
              <Route path="empleados/editar/:id" element={<EmployeeEdit />} />
              <Route path="empleados/listado" element={<ListarEmpleados/>} />
            </Route>

            {/* Usuario normal */}
            <Route
              path="/usuario"
              element={
                <ProtectorRutas usuarioLogueado={usuarioLogueado} rolPermitido="user">
                  <Usuario />
                </ProtectorRutas>
              }
            />

            {/* 404 opcional */}
            <Route path="*" element={<div>Página no encontrada</div>} />

          </Routes>
        </main>
      </div>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
