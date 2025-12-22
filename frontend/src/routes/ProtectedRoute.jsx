import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ allowedRoles }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  let payload;
  try {
    payload = JSON.parse(atob(token.split(".")[1]));
  } catch {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(payload.role)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
