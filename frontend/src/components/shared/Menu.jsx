import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { NavLink, Link, useNavigate } from "react-router"; 
import { logoutUser } from "../../utils/authAPI"; 

const Menu = ({ usuarioLogueado, setUsuarioLogueado }) => {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    logoutUser();
    setUsuarioLogueado(null);
    navigate("/"); 
  };

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
            {/* Link a Inicio */}
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

            {/* Renderizado Condicional de Login / Logout */}
            {usuarioLogueado ? (
              // Si el usuario está logueado, mostramos su rol y el botón de Cerrar Sesión
              <>
                <Navbar.Text className="me-3 nav-link disabled">
                  Hola, {usuarioLogueado.role}
                </Navbar.Text>
                <Button 
                  variant="outline-danger" 
                  onClick={handleLogout}
                  className="ms-2" // Añadimos un pequeño margen
                >
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              // Si no está logueado, mostramos los enlaces a Login y Registro
              <>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
                <Link className="nav-link" to="/register">
                  Registro
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;