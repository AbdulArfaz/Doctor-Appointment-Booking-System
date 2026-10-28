import React, { useState } from "react";
import { assets } from "../assets_admin/assets";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = ({ role, onLogout }) => {
  const navigate = useNavigate();
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = async () => {
    try {
      const endpoint =
        role === "admin"
          ? "/api/admin/logout"
          : "/api/doctors/logout";

      const { data } = await axios.post(
        `${backendurl}${endpoint}`,
        {},
        { withCredentials: true }
      );

      if (data.success) {
        onLogout();
        navigate("/", { replace: true });
        toast.success("Logged out successfully");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Logout failed. Please try again."
      );
    }
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-semibold
     transition-all duration-300 whitespace-nowrap
     ${
       isActive
         ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25"
         : "text-slate-500 hover:bg-indigo-50 hover:text-indigo-700"
     }`;

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-indigo-100/70 bg-white/90 shadow-[0_8px_30px_rgba(60,72,140,0.06)] backdrop-blur-xl">
      {/* Top bar */}
      <div className="flex min-h-19 items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-12">
        {/* Brand */}
        <NavLink
          to={role === "admin" ? "/admin-dashboard" : "/doctor-dashboard"}
          onClick={closeMenu}
          className="group flex shrink-0 items-center gap-3"
        >
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500 via-indigo-600 to-violet-600 shadow-lg shadow-indigo-500/25 transition-transform duration-300 group-hover:scale-105">
            <img
              src={assets.admin_logo}
              alt="DocSlot"
              className="h-8 w-8 object-contain"
            />
          </div>

          <div>
            <h1 className="text-[23px] font-extrabold tracking-tight text-slate-900">
              Doc<span className="bg-linear-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Slot</span>
            </h1>
            <p className="-mt-0.5 text-[10px] font-semibold uppercase tracking-[2px] text-slate-400">
              Healthcare Portal
            </p>
          </div>
        </NavLink>

        {/* User actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden items-center gap-3 rounded-2xl border border-indigo-100/80 bg-linear-to-r from-blue-50/80 to-violet-50/80 px-3 py-2 sm:flex">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-violet-600 text-sm font-extrabold text-white shadow-md shadow-indigo-500/20">
              {role === "admin" ? "A" : "D"}
            </div>

            <div className="pr-2">
              <p className="text-xs font-bold text-slate-800">
                {role === "admin" ? "Administrator" : "Doctor"}
              </p>
              <p className="mt-0.5 text-[11px] text-slate-500">
                {role === "admin" ? "Admin Portal" : "Doctor Portal"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={logout}
            className="group flex items-center gap-2 rounded-xl border border-rose-100 bg-rose-50 px-3.5 py-2.5 text-xs font-bold text-rose-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-rose-500 hover:bg-rose-500 hover:text-white hover:shadow-lg hover:shadow-rose-500/20 sm:px-4 sm:text-sm"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              <path
                d="M10 17l5-5-5-5M15 12H3m9-8h5a3 3 0 013 3v10a3 3 0 01-3 3h-5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Logout
          </button>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-xl border border-indigo-100 bg-white text-slate-700 transition hover:bg-indigo-50 md:hidden"
          >
            <span className={`h-0.5 w-5 rounded-full bg-current transition-all ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 w-5 rounded-full bg-current transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-5 rounded-full bg-current transition-all ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

     {/* Navigation */}
<nav
  className={`${
    menuOpen ? "block" : "hidden"
  } border-t border-indigo-100/70 bg-white/95 px-3 py-3 md:block md:px-6 lg:px-12`}
  aria-label="Staff navigation"
>
  <div className="mx-auto flex max-w-7xl flex-col gap-2 md:flex-row md:items-center md:justify-center md:gap-4">
    {role === "admin" ? (
      <>
        <NavLink
          to="/admin-dashboard"
          onClick={closeMenu}
          className={linkClass}
        >
          <span className="text-lg">▦</span>
          Dashboard
        </NavLink>

        <NavLink
          to="/admin-addDoctor"
          onClick={closeMenu}
          className={linkClass}
        >
          <span className="text-xl">＋</span>
          Add Doctor
        </NavLink>

        <NavLink
          to="/admin-allAppointments"
          onClick={closeMenu}
          className={linkClass}
        >
          <span className="text-lg">▤</span>
          Appointments
        </NavLink>

        <NavLink
          to="/admin-doctorList"
          onClick={closeMenu}
          className={linkClass}
        >
          <span className="text-lg">♙</span>
          Doctors
        </NavLink>
      </>
    ) : (
      <>
        <NavLink
          to="/doctor-dashboard"
          onClick={closeMenu}
          className={linkClass}
        >
          <span className="text-lg">▦</span>
          Dashboard
        </NavLink>

        <NavLink
          to="/doctor-appointments"
          onClick={closeMenu}
          className={linkClass}
        >
          <span className="text-lg">▤</span>
          Appointments
        </NavLink>

        <NavLink
          to="/doctor-profile"
          onClick={closeMenu}
          className={linkClass}
        >
          <span className="text-lg">♙</span>
          Profile
        </NavLink>
      </>
    )}
  </div>
</nav>
    </header>
  );
};

export default Navbar;