import React from "react";
import {
  Nav,
  InputGroup,
  FormControl,
} from "react-bootstrap";

import {
  BsSearch,
  BsHouseDoor,
  BsGear,
  BsTools,
  BsSliders,
} from "react-icons/bs";

import "../../css/Sidebar.css";


function Sidebar({ activeKey }) {
  return (
    <div className="sidebar-container d-flex flex-column p-3">

      {/* Título del sistema */}
      <h5 className="text-primary fw-bold mb-4"></h5>

      {/* Buscador */}
      <InputGroup className="mb-4 shadow-sm rounded">
        <FormControl placeholder="Buscar..." />
        <InputGroup.Text className="bg-white">
          <BsSearch />
        </InputGroup.Text>
      </InputGroup>

      {/* Menú */}
      <Nav
        variant="pills"
        className="flex-column gap-2"
        activeKey={activeKey}
      >
        <Nav.Item>
          <Nav.Link
            eventKey="home"
            href="Home.jsx"
            className="sidebar-link d-flex align-items-center"
          >
            <BsHouseDoor className="me-2" />
            Home
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link
            eventKey="configuracion"
            href="/configuracion/SectoresPage.jsx"
            className="sidebar-link d-flex align-items-center"
          >
            <BsGear className="me-2" />
            Configuración
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link
            eventKey="administracion"
            href="Administracion.jsx"
            className="sidebar-link d-flex align-items-center"
          >
            <BsTools className="me-2" />
            Administración
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link
            eventKey="settings"
            href="Configuracion.jsx"
            className="sidebar-link d-flex align-items-center"
          >
            <BsSliders className="me-2" />
            Settings
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {/* Footer opcional */}
      <div className="mt-auto small text-muted ps-1">
        ©2025 SGP - Todos los derechos reservados.
      </div>
    </div>
  );
}

export default Sidebar;
