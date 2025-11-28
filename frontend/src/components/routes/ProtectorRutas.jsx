import { Navigate, Outlet } from "react-router";

const ProtectorRutas = ({ usuarioLogueado, rolPermitido }) => {
  if (!usuarioLogueado) return <Navigate to="/login" />;

  if (rolPermitido && usuarioLogueado.role !== rolPermitido) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectorRutas;
