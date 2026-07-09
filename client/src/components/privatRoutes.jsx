import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ children, requiredRole, loginPath }) => {
  const token = localStorage.getItem("token");

  // No token → redirect to login
  // if (!token) return <Navigate to="/login" />;
  if (!token) return <Navigate to={loginPath} replace />;

  try {
    const decoded = jwtDecode(token);

    // Check if token is expired
    const isExpired = !decoded.exp || decoded.exp * 1000 < Date.now();
    if (isExpired) {
      localStorage.removeItem("token");
      // return <Navigate to="/login" />;
      return <Navigate to={loginPath} replace />;
    }

    // Check if role matches
    if (requiredRole && decoded.role !== requiredRole) {
      return <Navigate to="/unauthorized" />;
    }

    return children;
  } catch (err) {
    // Token is invalid/corrupted
    localStorage.removeItem("token");
    return <Navigate to={loginPath} replace />;
  }
};

export default PrivateRoute;
