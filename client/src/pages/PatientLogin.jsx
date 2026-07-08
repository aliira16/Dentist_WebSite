import { useState } from "react";
import axios from "axios";

const PatientLogin = () => {
  const [form, setForm] = useState({ name: "", patient_code: "" });

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/patient/login",
        form,
      );
      localStorage.setItem("token", res.data.token);
      window.location.href = "/patient/dashboard";
    } catch (err) {
      alert("Invalid name or patient code");
    }
  };

  return (
    <div>
      <input
        placeholder="Your Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Patient Code"
        type="password"
        onChange={(e) => setForm({ ...form, patient_code: e.target.value })}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};
export default PatientLogin;
