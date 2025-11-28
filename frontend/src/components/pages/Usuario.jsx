import "./Usuario.css";

const Usuario = () => {
  return (
    <div className="usuario-page">
      <div className="usuario-container">
        <div className="usuario-header">
          <h1>Panel de Usuario</h1>
          <p>Bienvenido a tu espacio personal</p>
        </div>

        <div className="usuario-welcome">
          <div className="usuario-welcome-content">
            <div className="usuario-icon">
              👤
            </div>
            <h2>¡Hola Usuario!</h2>
            <p>
              Este es tu panel personalizado. Aquí podrás gestionar tu información,
              consultar tus datos y acceder a las funcionalidades disponibles para tu rol.
            </p>
          </div>
        </div>

        <div className="usuario-features">
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Mis Datos</h3>
            <p>
              Consulta y actualiza tu información personal, revisa tu perfil
              y mantén tus datos al día.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3>Mis Solicitudes</h3>
            <p>
              Revisa el estado de tus solicitudes, consulta el historial
              y gestiona tus peticiones.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔔</div>
            <h3>Notificaciones</h3>
            <p>
              Mantente informado sobre actualizaciones importantes,
              cambios y comunicados del sistema.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Usuario;
