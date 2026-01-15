import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const access = localStorage.getItem("access_token"); // use your real key
  return access ? <Outlet /> : <Navigate to="/login" replace />;
}