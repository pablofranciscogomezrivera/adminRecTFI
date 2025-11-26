import { BrowserRouter, Routes, Route } from "react-router";
import { useState, useEffect } from "react";

import Inicio from "./components/pages/Inicio";
import Login from "./components/pages/Login";
import Administrador from "./components/pages/Administrador";
import Usuario from "./components/pages/Usuario"; // página para usuario normal
// import Error404 from "./components/pages/Error404";

import Menu from "./components/shared/Menu";
import Footer from "./components/shared/Footer";
import ProtectorRutas from "./components/routes/ProtectorRutas";

function App() {
  // Leer usuario logueado desde sessionStorage
  const usuarioSessionStorage =
    JSON.parse(sessionStorage.getItem("usuarioKey")) || null;

  const [usuarioLogueado, setUsuarioLogueado] = useState(usuarioSessionStorage);

  // Guardar usuario logueado en sessionStorage cada vez que cambie
  useEffect(() => {
    // Si el usuario es null, borra la clave, si no, la guarda.
    if (usuarioLogueado) {
      sessionStorage.setItem("usuarioKey", JSON.stringify(usuarioLogueado));
    } else {
      sessionStorage.removeItem("usuarioKey"); // Limpiamos la sesión al hacer logout
    }
  }, [usuarioLogueado]);

  return (
    <BrowserRouter>
      {/* Menu recibe usuarioLogueado para mostrar links según rol */}
      <Menu usuarioLogueado={usuarioLogueado} setUsuarioLogueado={setUsuarioLogueado} />

      <Routes>
        {/* Página principal */}
        <Route path="/" element={<Inicio />} />

        {/* Login recibe setUsuarioLogueado para actualizar estado */}
        <Route
          path="/login"
          element={<Login setUsuarioLogueado={setUsuarioLogueado} />}
        />

        {/* Rutas protegidas para admin */}
        <Route
          path="/administrador/*"
          element={
            <ProtectorRutas usuarioLogueado={usuarioLogueado} rolPermitido="admin" />
          }
        >
          <Route index element={<Administrador />} />
          {/* Podés agregar subrutas aquí si necesitás */}
        </Route>

        {/* Ruta protegida para usuario normal */}
        <Route
          path="/usuario"
          element={
            <ProtectorRutas usuarioLogueado={usuarioLogueado} rolPermitido="user">
              <Usuario />
            </ProtectorRutas>
          }
        />

      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
