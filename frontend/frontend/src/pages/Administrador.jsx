import { Link } from "react-router";
import { Container, Row, Col } from "react-bootstrap";
import "./Administrador.css";

const Administrador = () => {
  return (
    <Container className="admin-container">
      <div className="admin-header">
        <h1 className="admin-title">Panel de Administración</h1>
        <p className="admin-subtitle">Gestiona tu organización de forma eficiente</p>
      </div>
      
      <Row className="g-4">
        <Col lg={4} md={6}>
          <Link to="dashboard" className="card-link">
            <div className="modern-card card-dashboard">
              <div className="card-icon-wrapper">
                <svg className="card-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="card-title">Dashboard</h3>
              <p className="card-description">Reportes ejecutivos y estadísticas en tiempo real</p>
              <div className="card-arrow">→</div>
            </div>
          </Link>
        </Col>

        <Col lg={4} md={6}>
          <Link to="empleados/listado" className="card-link">
            <div className="modern-card card-employees">
              <div className="card-icon-wrapper">
                <svg className="card-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="card-title">Empleados</h3>
              <p className="card-description">Gestiona el personal y estructura organizativa</p>
              <div className="card-arrow">→</div>
            </div>
          </Link>
        </Col>

        <Col lg={4} md={6}>
          <Link to="configuracion" className="card-link">
            <div className="modern-card card-settings">
              <div className="card-icon-wrapper">
                <svg className="card-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="card-title">Configuración</h3>
              <p className="card-description">Define sectores, roles y parámetros del sistema</p>
              <div className="card-arrow">→</div>
            </div>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Administrador;