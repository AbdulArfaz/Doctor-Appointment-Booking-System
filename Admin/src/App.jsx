import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Admin.Navbar";
import { Routes, Route, Navigate } from "react-router-dom";

import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminAddDoctor from "./pages/Admin/AdminAddDoctor";
import AdminAllAppointment from "./pages/Admin/AdminAllAppointments";
import AdminDoctorList from "./pages/Admin/AdminDoctorList";

import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
import DoctorProfile from "./pages/Doctor/DoctorProfile";

import StaffLogin from "./pages/StaffLogin";

const backendurl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const verifySession = async () => {
    const api = axios.create({
      baseURL: backendurl,
      withCredentials: true,
    });

    try {
      try {
        await api.get("/api/admin/verify-session");
        setRole("admin");
        return;
      } catch{

      }

      try {
        await api.get("/api/doctors/verify-session");
        setRole("doctor");
      } catch (error) {
        console.log(
          "Doctor verification failed:",
          error.response?.data || error.message
        );
        setRole(null);
      }
    } finally {
      setLoading(false);
    }
  };

  verifySession();
}, []);

  if (loading) {
    return <p>Checking session...</p>;
  }

  if (!role) {
    return (
      <>
        <StaffLogin />
        <ToastContainer />
      </>
    );
  }

  return (
    <div>
      <ToastContainer />
      <Navbar
      role={role}
      onLogout={() => setRole(null) }
      />

      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to={
                role === "admin"
                  ? "/admin-dashboard"
                  : "/doctor-dashboard"
              }
              replace
            />
          }
        />

        {role === "admin" && (
          <>
            <Route
              path="/admin-dashboard"
              element={<AdminDashboard />}
            />
            <Route
              path="/admin-addDoctor"
              element={<AdminAddDoctor />}
            />
            <Route
              path="/admin-allAppointments"
              element={<AdminAllAppointment />}
            />
            <Route
              path="/admin-doctorList"
              element={<AdminDoctorList />}
            />
          </>
        )}

        {role === "doctor" && (
          <>
            <Route
              path="/doctor-dashboard"
              element={<DoctorDashboard />}
            />
            <Route
              path="/doctor-appointments"
              element={<DoctorAppointments />}
            />
            <Route
              path="/doctor-profile"
              element={<DoctorProfile />}
            />
          </>
        )}

        <Route
          path="*"
          element={
            <Navigate
              to={
                role === "admin"
                  ? "/admin-dashboard"
                  : "/doctor-dashboard"
              }
              replace
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;