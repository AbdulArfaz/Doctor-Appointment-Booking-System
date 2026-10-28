import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext.jsx";
import { StaffAuthContext } from "../App.jsx";
import { useNavigate } from "react-router-dom";

const StaffLogin = () => {
  const naviagte = useNavigate();
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { handleStaffLogin } = useContext(StaffAuthContext);
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

      handleStaffLogin(state);

      toast.success(data.message || `${state} login successful`);
    } else {
      toast.error(data.message || "Login failed");
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        error.message ||
        "Login failed"
    );
  } finally {
    setLoading(false);
  }
};

  const switchRole = () => {
    setState((prev) => (prev === "Admin" ? "Doctor" : "Admin"));
    setEmail("");
    setPassword("");
  };

  return (
    <>
     <button
  type="button"
  onClick={() => navigate("/")}
  className="mb-5 inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl hover:shadow-indigo-500/30 active:scale-95"
>
  <span className="text-lg transition-transform duration-300 group-hover:-translate-x-1">
    ←
  </span>
  Back to Home
</button>
    <div className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-slate-950 px-4 py-12 sm:px-6">
    
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-indigo-600/25 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-violet-600/20 blur-[110px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[100px]" />

      <form
        onSubmit={submitHandler}
        className="relative z-10 w-full max-w-md"
      >
        <div className="rounded-3xl border border-white/10 bg-white/6 p-6 shadow-2xl shadow-indigo-950/40 backdrop-blur-2xl sm:p-9">
      
          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-indigo-300/20 bg-linear-to-br from-indigo-500/25 to-violet-500/25 shadow-lg shadow-indigo-500/10">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-8 w-8 text-indigo-300"
                aria-hidden="true"
              >
                <path
                  d="M12 3v18M3 12h18"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <p className="text-sm font-semibold tracking-[0.25em] text-indigo-300">
              DOCSLOT
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Welcome <span className="bg-linear-to-r from-indigo-300 via-violet-300 to-blue-300 bg-clip-text text-transparent">back</span>
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Sign in to access your {state.toLowerCase()} workspace.
            </p>
          </div>

          <div className="mb-7 grid grid-cols-2 rounded-xl border border-white/10 bg-slate-900/70 p-1">
            {["Admin", "Doctor"].map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => {
                  if (state !== role) switchRole();
                }}
                className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  state === role
                    ? "bg-linear-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-950/40"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {role}
              </button>
            ))}
          </div>

   
          <div className="mb-5">
            <label
              htmlFor="staff-email"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Email address
            </label>

            <div className="group flex items-center gap-3 rounded-xl border border-white/10 bg-slate-900/60 px-4 transition-all duration-300 focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-500/10">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5 shrink-0 text-slate-500 transition-colors group-focus-within:text-indigo-300"
                aria-hidden="true"
              >
                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="14"
                  rx="3"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
                <path
                  d="m4 7 8 6 8-6"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <input
                id="staff-email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                autoComplete="username"
                placeholder="you@example.com"
                required
                className="w-full min-w-0 bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-slate-600"
              />
            </div>
          </div>

       
          <div className="mb-7">
            <label
              htmlFor="staff-password"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Password
            </label>

            <div className="group flex items-center gap-3 rounded-xl border border-white/10 bg-slate-900/60 px-4 transition-all duration-300 focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-500/10">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5 shrink-0 text-slate-500 transition-colors group-focus-within:text-indigo-300"
                aria-hidden="true"
              >
                <rect
                  x="4"
                  y="10"
                  width="16"
                  height="11"
                  rx="2.5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
                <path
                  d="M8 10V7a4 4 0 0 1 8 0v3"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>

              <input
                id="staff-password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                required
                className="w-full min-w-0 bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-slate-600"
              />
            </div>
          </div>

        
          <button
            type="submit"
            disabled={loading}
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-size-[200%_100%] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-950/40 transition-all duration-300 hover:bg-right hover:shadow-xl hover:shadow-indigo-500/20 focus:outline-none focus:ring-4 focus:ring-indigo-400/25 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <svg
                  className="h-5 w-5 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-90"
                    fill="currentColor"
                    d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Signing in...
              </>
            ) : (
              <>
                Sign in as {state}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  <path
                    d="M5 12h14m-6-6 6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </>
            )}
          </button>

       
          <p className="mt-7 text-center text-sm text-slate-400">
            {state === "Admin" ? "Are you a doctor?" : "Are you an admin?"}{" "}
            <button
              type="button"
              onClick={switchRole}
              className="font-semibold text-indigo-300 transition-colors hover:text-violet-200 focus:outline-none focus:underline"
            >
              Login here
            </button>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          Secure access to your DocSlot dashboard
        </p>
      </form>
    </div>
    </>
  );
};

export default StaffLogin;