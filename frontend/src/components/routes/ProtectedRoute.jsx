import { Navigate } from "react-router";
import { getUserFromToken } from "../api/mockAuthApi";

const ProtectedRoute = ({ children, role }) => {
  const user = getUserFromToken();
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/login" />;
  return children;
};

export default ProtectedRoute;
