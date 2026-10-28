import React, { useEffect, useState, createContext, useCallback, useRef } from "react";
import axios from "axios";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Patient pages
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import MyAppointments from "./pages/MyAppointments";
import Appointment from "./pages/Appointment";

// Patient components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// Staff components and pages
import AdminNavbar from "./components/Admin.Navbar";
import StaffLogin from "./pages/StaffLogin";

import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminAddDoctor from "./pages/Admin/AdminAddDoctor";
import AdminAllAppointment from "./pages/Admin/AdminAllAppointments";
import AdminDoctorList from "./pages/Admin/AdminDoctorList";

import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
import DoctorProfile from "./pages/Doctor/DoctorProfile";


export const StaffAuthContext = createContext(null);

const backendurl = import.meta.env.VITE_BACKEND_URL;

function App() {
  const location = useLocation();
  const verifiedRoleRef = useRef(null);
  const [role, setRole] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);

  const isStaffLogin = location.pathname === "/staff-login";

  const isStaffPath =
    location.pathname.startsWith("/admin-") ||
    location.pathname.startsWith("/doctor-");

  const isPatientPath = !isStaffPath && !isStaffLogin;

const handleStaffLogin = (loggedInRole) => {
  const normalizedRole = loggedInRole.toLowerCase();
  verifiedRoleRef.current = normalizedRole;
  setRole(normalizedRole);
  setCheckingSession(false);
};

useEffect(() => {
  const isStaffPage =
    location.pathname.startsWith("/admin-") ||
    location.pathname.startsWith("/doctor-");

  if (!isStaffPage) {
    setCheckingSession(false);
    return;
  }

  let cancelled = false;

  const verifySession = async () => {
    setCheckingSession(true);

    const api = axios.create({
      baseURL: backendurl,
      withCredentials: true,
    });

    if (verifiedRoleRef.current) {
      const knownRole = verifiedRoleRef.current;

      try {
        const endpoint =
          knownRole === "admin"
            ? "/api/admin/verify-session"
            : "/api/doctors/verify-session";

        await api.get(endpoint);

        if (!cancelled) {
          setRole(knownRole);
          setCheckingSession(false);
        }
        return;
      } catch {
        if (cancelled) return;

        verifiedRoleRef.current = null;
        setRole(null);
      }
    }

    let currentRole = null;

    try {
      await api.get("/api/admin/verify-session");
      currentRole = "admin";
    } catch {
      try {
        await api.get("/api/doctors/verify-session");
        currentRole = "doctor";
      } catch {
        currentRole = null;
      }
    }

    if (!cancelled) {
      verifiedRoleRef.current = currentRole;
      setRole(currentRole);
      setCheckingSession(false);
    }
  };

  verifySession();

  return () => {
    cancelled = true;
  };
}, [location.pathname]);

  if (isStaffPath && checkingSession) {
    return <p>Checking staff session...</p>;
  }

  return (
    <StaffAuthContext.Provider value={{ handleStaffLogin }}>
      <div>
        <ToastContainer />

        {isPatientPath && (
          <>
            <Navbar />
            <ScrollToTop />
          </>
        )}

        {role && isStaffPath && (
          <AdminNavbar
            role={role}
            onLogout={() => setRole(null)}
          />
        )}

        <Routes>
          {/* Patient routes */}
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:speciality" element={<Doctors />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/my-appointments" element={<MyAppointments />} />
          <Route path="/appointment/:drId" element={<Appointment />} />

          {/* Staff login */}
          <Route
            path="/staff-login"
            element={
              checkingSession ? (
                <p>Checking staff session...</p>
              ) : role ? (
                <Navigate
                  to={
                    role === "admin"
                      ? "/admin-dashboard"
                      : "/doctor-dashboard"
                  }
                  replace
                />
              ) : (
                <StaffLogin />
              )
            }
          />

          {/* Admin routes */}
          <Route
            path="/admin-dashboard"
            element={
              role === "admin" ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/staff-login" replace />
              )
            }
          />

          <Route
            path="/admin-addDoctor"
            element={
              role === "admin" ? (
                <AdminAddDoctor />
              ) : (
                <Navigate to="/staff-login" replace />
              )
            }
          />

          <Route
            path="/admin-allAppointments"
            element={
              role === "admin" ? (
                <AdminAllAppointment />
              ) : (
                <Navigate to="/staff-login" replace />
              )
            }
          />

          <Route
            path="/admin-doctorList"
            element={
              role === "admin" ? (
                <AdminDoctorList />
              ) : (
                <Navigate to="/staff-login" replace />
              )
            }
          />

          {/* Doctor routes */}
          <Route
            path="/doctor-dashboard"
            element={
              role === "doctor" ? (
                <DoctorDashboard />
              ) : (
                <Navigate to="/staff-login" replace />
              )
            }
          />

          <Route
            path="/doctor-appointments"
            element={
              role === "doctor" ? (
                <DoctorAppointments />
              ) : (
                <Navigate to="/staff-login" replace />
              )
            }
          />

          <Route
            path="/doctor-profile"
            element={
              role === "doctor" ? (
                <DoctorProfile />
              ) : (
                <Navigate to="/staff-login" replace />
              )
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {isPatientPath && <Footer />}
      </div>
    </StaffAuthContext.Provider>
  );
}

export default App;