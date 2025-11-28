import { Link } from "react-router";
import { Container, Row, Col } from "react-bootstrap";
import "./Inicio.css";

const Inicio = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="hero-content">
                <div className="hero-badge">Sistema de Gestión</div>
                <h1 className="hero-title">
                  Administra tu <span className="text-gradient">equipo</span> de forma inteligente
                </h1>
                <p className="hero-description">
                  Plataforma integral para gestionar empleados, sectores y roles. 
                  Genera reportes ejecutivos y toma decisiones basadas en datos.
                </p>
                <div className="hero-actions">
                  <Link to="/login" className="btn-primary-custom">
                    Iniciar Sesión
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                  <Link to="/register" className="btn-secondary-custom">
                    Registrarse
                  </Link>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="hero-image">
                <div className="floating-card card-1">
                  <div className="card-icon">📊</div>
                  <div className="card-info">
                    <div className="card-label">Reportes</div>
                    <div className="card-value">En tiempo real</div>
                  </div>
                </div>
                <div className="floating-card card-2">
                  <div className="card-icon">👥</div>
                  <div className="card-info">
                    <div className="card-label">Empleados</div>
                    <div className="card-value">Gestión completa</div>
                  </div>
                </div>
                <div className="floating-card card-3">
                  <div className="card-icon">⚙️</div>
                  <div className="card-info">
                    <div className="card-label">Configuración</div>
                    <div className="card-value">Personalizable</div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <Container>
          <div className="section-header">
            <h2 className="section-title">Funcionalidades principales</h2>
            <p className="section-subtitle">Todo lo que necesitas para gestionar tu equipo</p>
          </div>
          
          <Row className="g-4">
            <Col md={4}>
              <div className="feature-card">
                <div className="feature-icon feature-icon-purple">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor"/>
                  </svg>
                </div>
                <h3 className="feature-title">Gestión de Personal</h3>
                <p className="feature-description">
                  Administra empleados, altas, bajas y modificaciones con formularios intuitivos
                </p>
              </div>
            </Col>

            <Col md={4}>
              <div className="feature-card">
                <div className="feature-icon feature-icon-pink">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" fill="currentColor"/>
                  </svg>
                </div>
                <h3 className="feature-title">Dashboard Ejecutivo</h3>
                <p className="feature-description">
                  Visualiza KPIs, gráficos interactivos y exporta reportes en PDF
                </p>
              </div>
            </Col>

            <Col md={4}>
              <div className="feature-card">
                <div className="feature-icon feature-icon-blue">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" fill="currentColor"/>
                  </svg>
                </div>
                <h3 className="feature-title">Seguridad Avanzada</h3>
                <p className="feature-description">
                  Control de acceso basado en roles con autenticación JWT
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <Container>
          <Row className="text-center">
            <Col md={3} className="mb-4">
              <div className="stat-item">
                <div className="stat-number">100%</div>
                <div className="stat-label">Funcional</div>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="stat-item">
                <div className="stat-number">10+</div>
                <div className="stat-label">Módulos</div>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="stat-item">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Disponible</div>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="stat-item">
                <div className="stat-number">Seguro</div>
                <div className="stat-label">JWT Auth</div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Inicio;
