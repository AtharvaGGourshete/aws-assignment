import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="px-4 py-16 text-center text-lg font-medium">Loading account...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace state={{ from: location.pathname }} />;
  }

  return children;
};

export default ProtectedRoute;
