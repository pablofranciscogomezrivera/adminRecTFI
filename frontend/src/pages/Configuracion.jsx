import { Link } from "react-router";
import { Container, Row, Col } from "react-bootstrap";
import "./Configuracion.css";

const Configuracion = () => {
  return (
    <Container className="config-container">
      <div className="config-header">
        <Link to="/administrador" className="back-button">
          ← Volver
        </Link>
        <h1 className="config-title">Configuración del Sistema</h1>
        <p className="config-subtitle">Define la estructura de tu organización</p>
      </div>
      
      <Row className="g-4 justify-content-center">
        <Col lg={5} md={6}>
          <Link to="sectores" className="config-card-link">
            <div className="config-card config-card-sectors">
              <div className="config-card-header">
                <div className="config-icon-wrapper">
                  <svg className="config-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" fill="currentColor"/>
                  </svg>
                </div>
                <h3 className="config-card-title">Sectores</h3>
              </div>
              <p className="config-card-description">
                Organiza tu empresa en departamentos y áreas de trabajo
              </p>
              <div className="config-card-footer">
                <span className="config-card-action">Gestionar sectores →</span>
              </div>
              <div className="config-card-bg"></div>
            </div>
          </Link>
        </Col>

        <Col lg={5} md={6}>
          <Link to="roles" className="config-card-link">
            <div className="config-card config-card-roles">
              <div className="config-card-header">
                <div className="config-icon-wrapper">
                  <svg className="config-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor"/>
                    <path d="M20 10v-2h-2V6h-2v2h-2v2h2v2h2v-2h2z" fill="currentColor"/>
                  </svg>
                </div>
                <h3 className="config-card-title">Roles</h3>
              </div>
              <p className="config-card-description">
                Define posiciones y responsabilidades dentro del equipo
              </p>
              <div className="config-card-footer">
                <span className="config-card-action">Gestionar roles →</span>
              </div>
              <div className="config-card-bg"></div>
            </div>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Configuracion;