import React from 'react';
// 1. Importaciones de React Router DOM
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// 2. Importaciones de React-Bootstrap
import { Container, Row, Col } from 'react-bootstrap';
import '../css/App.css';

// 3. Importaciones de Componentes de Layout
import NavbarPrincipal from './components/NavbarPrincipal.jsx'; // Asegúrate de la ruta correcta
import Sidebar from "./components/Sidebar.jsx";


// 4. Importaciones de Páginas/Vistas
import SectoresPage from './pages/configuracion/SectoresPage'; // <-- HU 1: ¡LA RUTA IMPORTANTE!

// Componentes Placeholder (debes crearlos)
const HomePage = () => <h1>🏠 Home Dashboard</h1>;
const ConfiguracionPage = () => <h1>⚙️ Configuración General</h1>; 
const AdministracionPage = () => <h1>👥 Administración del Personal</h1>;
const SettingsPage = () => <h1>🔧 Ajustes Globales</h1>;

function App() {
  // NOTA: Para que el Sidebar muestre el elemento activo, puedes usar 'useLocation' 
  // en un componente wrapper o pasar la ubicación como prop al Sidebar.
  // Por simplicidad aquí, lo simularemos con rutas fijas.

  return (
    <Router>
      {/* Barra de Navegación Superior */}
      <NavbarPrincipal />
      
      {/* Contenedor principal que usa el sistema de Grid de Bootstrap */}
      <Container fluid className="p-0">
        <Row className="g-0"> {/* g-0 elimina el margen entre columnas */}
          
          {/* Columna para el Menú Lateral (md={2} para 2/12 del ancho) */}
          <Col md={2} lg={2} className="d-none d-md-block"> 
            <Sidebar activeKey={window.location.pathname.startsWith('/configuracion/SectoresPage.jsx') ? 'configuracion' : 'home'} />
          </Col>
          {/* Columna para el Contenido Principal (md={10} para 10/12 del ancho) */}
          <Col md={10} lg={10} sm={12} className="p-4"> 
            {/* Definición de Rutas */}
            <Routes>
              {/* Rutas Base */}
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />

              {/* MÓDULO DE CONFIGURACIÓN */}
              <Route 
                path="/configuracion/SectoresPage.jsx" 
                element={<SectoresPage />} 
              />
              <Route path="/configuracion" element={<ConfiguracionPage />} />

              {/* MÓDULOS FUTUROS */}
              <Route path="/administracion" element={<AdministracionPage />} />
              <Route path="/settings" element={<SettingsPage />} />

              {/* Ruta de 404 (Opcional) */}
              <Route path="*" element={<h1>404: Página no encontrada</h1>} />
            </Routes>
          </Col>

        </Row>
      </Container>
    </Router>
  );
}

export default App;