import { BrowserRouter, Routes, Route } from "react-router";
import Inicio from "./components/pages/Inicio";
import Administrador from "./components/pages/Administrador";
import Usuario from "./components/pages/Usuario"; // <-- nuevo componente para usuarios
import Menu from "./components/shared/Menu";
import Footer from "./components/shared/Footer";
import Login from "./components/pages/Login";
import ProtectedRoute from "./components/routes/ProtectedRoute"; // <-- ruta protegida

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Menu />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Inicio />} />

            {/* Ruta protegida solo para admin */}
            <Route
              path="/administrador"
              element={
                <ProtectedRoute role="admin">
                  <Administrador />
                </ProtectedRoute>
              }
            />

            {/* Ruta protegida solo para usuarios normales */}
            <Route
              path="/usuario"
              element={
                <ProtectedRoute role="user">
                  <Usuario />
                </ProtectedRoute>
              }
            />

            {/* Ruta de login */}
            <Route path="/login" element={<Login />} />

            {/* Redirigir rutas desconocidas al login */}
            <Route path="*" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
