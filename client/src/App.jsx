import React from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import PatientLogin from "./pages/PatientLogin.jsx";
import DoctorLogin from "./pages/DoctoreLogin.jsx";
import HomePage from "./pages/HomePage.jsx";
import AuthSuccess from "./pages/AuthSuccess.jsx";
import PrivateRoute from "./components/privatRoutes.jsx";
import DoctorDashboard from "./pages/DoctorDashboard.jsx";
import PatientDashboard from "./pages/PatientDashboard.jsx";
import Unauthorized from "./pages/Unauthorized.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/doctor/login" element={<DoctorLogin />} />
      <Route path="/patient/login" element={<PatientLogin />} />
      <Route path="/auth/success" element={<AuthSuccess />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Doctor only */}
      <Route
        path="/doctor/dashboard"
        element={
          <PrivateRoute requiredRole="doctor" loginPath="/doctor/login">
            <DoctorDashboard />
          </PrivateRoute>
        }
      />

      {/* Patient only */}
      <Route
        path="/patient/dashboard"
        element={
          <PrivateRoute requiredRole="patient" loginPath="/patient/login">
            <PatientDashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default App;
