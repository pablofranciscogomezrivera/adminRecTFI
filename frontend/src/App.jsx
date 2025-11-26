import Menu from "./components/shared/Menu";
import Footer from "./components/shared/Footer";
import { BrowserRouter, Routes, Route } from "react-router";
import Inicio from "./pages/Inicio";
import Administrador from "./pages/Administrador";
import Configuracion from "./pages/Configuracion";
import Sectores  from "./pages/configuraciones/Sectores";
import FormularioSector from "./pages/configuraciones/FormularioSector";
import { EmployeeCreate } from "./pages/AltaEmpleado";
import {EmployeeList} from "./pages/ListadoEmpleados";

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
            <Route path="/configuracion" element={<Configuracion></Configuracion>} />
            <Route path="configuracion/sectores" element={<Sectores></Sectores>} />
            <Route path="configuracion/crear" element={<FormularioSector></FormularioSector>} />
            <Route path="empleados/alta" element={< EmployeeCreate />} />
            <Route path="empleados/listar" element={<EmployeeList />} />

          </Routes>
        </main>

        <Footer></Footer>
      </div>
    </BrowserRouter>
  );
}
export default App;
