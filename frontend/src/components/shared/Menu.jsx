import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router"; // corregido

const Menu = ({ usuarioLogueado }) => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          <b>
            <i className="bi bi-code-slash"></i> SGP
          </b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink className="nav-link" to="/">
              Inicio
            </NavLink>

            {/* Link solo para admin */}
            {usuarioLogueado && usuarioLogueado.role === "admin" && (
              <NavLink className="nav-link" to="/administrador">
                Administrador
              </NavLink>
            )}

            {/* Link solo para usuario normal */}
            {usuarioLogueado && usuarioLogueado.role === "user" && (
              <NavLink className="nav-link" to="/usuario">
                Mi Perfil
              </NavLink>
            )}

            {/* Link login si no hay usuario logueado */}
            {!usuarioLogueado && (
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
