import { BrowserRouter, Routes, Route } from "react-router";
import Inicio from "./components/pages/Inicio";
import Administrador from "./components/pages/Administrador";
import Menu from "./components/shared/Menu";
import Footer from "./components/shared/Footer";
import Configuracion from "./components/pages/Configuracion";
import Sectores from "./components/pages/configuraciones/Sectores";
import FormularioSector from "./components/pages/configuraciones/FormularioSector";

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
            <Route path="configuracion/sectores" element={<Sectores></Sectores>}/>
            <Route path="configuracion/crear" element={<FormularioSector></FormularioSector>}/>
          </Routes>
        </main>

        <Footer></Footer>
      </div>
    </BrowserRouter>
  );
}
export default App;