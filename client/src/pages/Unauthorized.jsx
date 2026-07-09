import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>⛔ Access Denied</h2>
      <p>You don't have permission to view this page.</p>
      <button onClick={() => navigate("/doctor/login")}>Doctor Login</button>
      <button onClick={() => navigate("/patient/login")}>Patient Login</button>
    </div>
  );
};

export default Unauthorized;
