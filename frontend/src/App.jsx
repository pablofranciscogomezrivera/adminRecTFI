import { BrowserRouter, Routes, Route } from "react-router";
import Inicio from "./components/pages/Inicio";
import Administrador from "./components/pages/Administrador";
import Menu from "./components/shared/Menu";
import Footer from "./components/shared/Footer";
import Configuracion from "./components/pages/Configuracion";
import Roles from "./components/pages/configuraciones/Roles";
import FormularioRoles from "./components/pages/configuraciones/FormularioRoles";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Menu></Menu>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Inicio></Inicio>} />
            <Route
              path="/administrador"
              element={<Administrador></Administrador>}
            />
            <Route path="/configuracion" element={<Configuracion></Configuracion>}/>
            <Route path="configuracion/roles" element={<Roles></Roles>}/>
            <Route path="configuracion/crear" element={<FormularioRoles></FormularioRoles>}/>
          </Routes>
        </main>

        <Footer></Footer>
      </div>
    </BrowserRouter>
  );
}
export default App;