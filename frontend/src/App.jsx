import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NavbarPrincipal from './components/NavbarPrincipal'; 
import Sidebar from './components/Sidebar';                  

function App() {
  // Simulación del enrutamiento o estado activo
  const activeRoute = 'home'; // Esto lo manejariacon react-router-dom

  return (
    <>
      <NavbarPrincipal />
      
      {/* Contenedor principal con margen 0 para ocupar todo el ancho */}
      <Container fluid className="p-0">
        <Row className="g-0"> {/* g-0 elimina el gutter (espacio) entre columnas */}
          
          {/* Columna para el menú lateral (ocupa 2 de 12 unidades) */}
          <Col md={2} className="d-none d-md-block"> {/* Ocultar en móviles, mostrar en md y más */}
            <Sidebar activeKey={activeRoute} />
          </Col>
          
          {/* Columna para el contenido principal (ocupa 10 de 12 unidades) */}
          <Col md={10} className="p-4">
            {/* Aquí iría el contenido dinámico de tu aplicación (Home, Configuración, etc.).
              Usarías <Routes> de react-router-dom aquí. 
            */}
            <h1>Bienvenido a la Gestión de Personal</h1>
            <p>Selecciona una opción del menú lateral para comenzar.</p>
            {/* Ejemplo de un Card de Bootstrap */}
            {/* ... */}
          </Col>

        </Row>
      </Container>
    </>
  );
}

export default App;