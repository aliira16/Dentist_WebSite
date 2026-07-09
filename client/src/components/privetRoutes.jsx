import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token");

  // No token → redirect to login
  if (!token) return <Navigate to="/login" />;

  try {
    const decoded = jwtDecode(token);

    // Check if token is expired
    const isExpired = decoded.exp * 1000 < Date.now();
    if (isExpired) {
      localStorage.removeItem("token");
      return <Navigate to="/login" />;
    }

    // Check if role matches
    if (requiredRole && decoded.role !== requiredRole) {
      return <Navigate to="/unauthorized" />;
    }

    return children;
  } catch (err) {
    // Token is invalid/corrupted
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
