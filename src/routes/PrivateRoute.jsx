import { useAuth } from "../contextProvider/AuthContext";
import { Navigate, useLocation } from "react-router";

export default function PrivateRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (user) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location.pathname }} />;
}
