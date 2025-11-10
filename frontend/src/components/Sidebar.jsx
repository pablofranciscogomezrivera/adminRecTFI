import React from 'react';
import { Nav, InputGroup, FormControl, ListGroup } from 'react-bootstrap';
import { BsSearch, BsHouseDoor, BsGear, BsTools, BsSliders } from 'react-icons/bs';

function Sidebar({ activeKey }) {
  return (
    <div className="p-3 bg-light" style={{ minWidth: '250px', height: 'calc(100vh - 56px)' }}>
      <h5 className="mb-3 text-primary">SGP</h5>
      
      {/* Campo de Búsqueda */}
      <InputGroup className="mb-4">
        <FormControl
          placeholder="Buscar..."
          aria-label="Buscar"
        />
        <InputGroup.Text><BsSearch /></InputGroup.Text>
      </InputGroup>

      {/* Menú de Navegación (vertical) */}
      <Nav variant="pills" className="flex-column" activeKey={activeKey}>
        <Nav.Link eventKey="home" href="/home" className="d-flex align-items-center mb-1">
          <BsHouseDoor className="me-2" /> Home
        </Nav.Link>
        <Nav.Link eventKey="configuracion" href="/configuracion/SectoresPage.jsx" className="d-flex align-items-center mb-1">
          <BsGear className="me-2" /> Configuración
        </Nav.Link>
        <Nav.Link eventKey="administracion" href="/administracion" className="d-flex align-items-center mb-1">
          <BsTools className="me-2" /> Administración
        </Nav.Link>
        <Nav.Link eventKey="settings" href="/settings" className="d-flex align-items-center mb-1">
          <BsSliders className="me-2" /> Settings
        </Nav.Link>
      </Nav>
    </div>
  );
}

export default Sidebar;