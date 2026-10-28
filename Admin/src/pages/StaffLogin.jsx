import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/AdminLogin.css";
import { DoctorContext } from "../context/DoctorContext.jsx";

const StaffLogin = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { backendurl } = useContext(AdminContext);
  const { setProfileData } = useContext(DoctorContext);

  const submitHandler = async (evt) => {
    evt.preventDefault();
    setLoading(true);

    try {
      const endpoint =
        state === "Admin"
          ? "/api/admin/login"
          : "/api/doctors/login";

      const { data } = await axios.post(
        `${backendurl}${endpoint}`,
        { email, password },
        { withCredentials: true }
      );

      if (data.success) {
        if (state === "Doctor") {
          setProfileData(false);
        }
        toast.success(data.message || `${state} login successful`);
        window.location.reload();
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submitHandler} className="ad-container">
      <div className="ad-box">
        <p className="ad-title">
          <span>{state}</span> Login
        </p>

        <div className="ad-field">
          <p className="ad-label">Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            autoComplete="username"
            required
            className="ad-input"
          />
        </div>

        <div className="ad-field">
          <p className="ad-label">Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            autoComplete="current-password"
            required
            className="ad-input"
          />
        </div>

        <button
          type="submit"
          className="ad-btn"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {state === "Admin" ? (
          <p className="ad-text">
            Doctor Login?{" "}
            <span
              className="ad-link"
              onClick={() => setState("Doctor")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setState("Doctor");
                }
              }}
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="ad-text">
            Admin Login?{" "}
            <span
              className="ad-link"
              onClick={() => setState("Admin")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setState("Admin");
                }
              }}
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default StaffLogin;