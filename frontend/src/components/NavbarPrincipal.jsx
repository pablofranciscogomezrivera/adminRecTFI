import React from 'react';
import { Navbar, Container, Nav, Form, FormControl, Dropdown } from 'react-bootstrap';
import { BsBell, BsPersonCircle } from 'react-icons/bs'; // Para los iconos

function NavbarPrincipal() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container fluid>
        {/* Título de la aplicación */}
        <Navbar.Brand href="#">Sistema Gestion de Personal</Navbar.Brand>
        
        {/* Botón de colapso para móviles */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        {/* Elementos a la derecha */}
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            {/* Icono de Notificaciones */}
            <Nav.Link href="#" className="me-3">
              <BsBell size={20} />
            </Nav.Link>

            {/* Menú de Usuario */}
            <Dropdown align="end">
              <Dropdown.Toggle as={Nav.Link} className="text-white d-flex align-items-center">
                <span className="me-2">Mark Otto</span>
                <BsPersonCircle size={20} />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#perfil">Mi Perfil</Dropdown.Item>
                <Dropdown.Item href="#ajustes">Ajustes</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#logout">Cerrar Sesión</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarPrincipal;