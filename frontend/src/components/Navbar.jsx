import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../assets/pnglogo.jpg";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const { token, logoutUser, userData } = useContext(AppContext);

  const navItems = [
    { name: "HOME", path: "/" },
    { name: "DOCTORS", path: "/doctors" },
    { name: "ABOUT", path: "/about" },
    { name: "CONTACT", path: "/contact" },
    { name: "STAFF LOGIN", path: "/staff-login" },
  ];

  const closeMenus = () => {
    setShowMenu(false);
    setShowProfileMenu(false);
  };

  const handleLogout = () => {
    closeMenus();
    logoutUser();
  };

  return (
    <header className="relative z-50 w-full bg-white font-[Inter,system-ui,sans-serif]">
      {/* Top Contact Bar */}
      <div className="bg-[#07566a] text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-5 gap-y-2 px-4 py-2 text-xs sm:justify-end sm:px-6 md:px-8">
          <span className="flex items-center gap-2 font-medium text-white/90">
            <i className="fa-solid fa-phone text-[#b0f538]" />
            <a
              href="tel:+918724001944"
              className="text-inherit no-underline transition-colors hover:text-[#b0f538]"
            >
              +91 87240 01944
            </a>
          </span>

          <span className="hidden h-4 w-px bg-white/30 sm:block" />

          <a
            href="tel:+919706131039"
            className="flex items-center gap-2 font-medium text-white/90 no-underline transition-colors hover:text-[#b0f538]"
          >
            <i className="fa-solid fa-phone text-[#b0f538]" />
            +91 97061 31039
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="border-b border-slate-100 bg-white shadow-[0_4px_20px_rgba(15,23,42,0.04)]">
        <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3.5 sm:px-6 md:px-8">
          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenus}
            className="flex shrink-0 items-center gap-2 no-underline"
          >
            <img
              src={logo}
              alt="DocSlot logo"
              className="h-11 w-11 rounded-xl object-contain sm:h-12 sm:w-12"
            />

            <span className="text-[25px] font-extrabold tracking-tight sm:text-[28px]">
              <span className="text-[#e34b4b]">Doc</span>
              <span className="text-[#164e63]">Slot</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden items-center gap-1 p-0 md:flex">
            {navItems.map((item) => (
              <li key={item.path} className="list-none">
                <NavLink
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    `relative block rounded-lg px-4 py-3 text-[13px] font-bold tracking-wide no-underline transition-all duration-200 ${
                      isActive
                        ? "bg-[#eaf7f5] text-[#087568]"
                        : "text-slate-600 hover:bg-slate-50 hover:text-[#087568]"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Account Actions */}
          <div className="flex shrink-0 items-center gap-3">
            {token ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowProfileMenu((prev) => !prev)}
                  aria-label="Open profile menu"
                  aria-expanded={showProfileMenu}
                  className="flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white p-1.5 pr-2.5 transition-all hover:border-[#0b8b7b] hover:bg-slate-50"
                >
                  <img
                    src={
                      userData?.image || assets.profile_pic
                    }
                    alt="Profile"
                    className="size-9 rounded-full border border-slate-100 object-cover"
                  />

                  <span className="hidden max-w-25 truncate text-sm font-semibold text-slate-700 sm:block">
                    {userData?.name || "My Account"}
                  </span>

                  <i
                    className={`fa-solid fa-chevron-down text-[11px] text-slate-500 transition-transform duration-200 ${
                      showProfileMenu ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Profile Dropdown */}
                {showProfileMenu && (
                  <div className="absolute right-0 top-[calc(100%+12px)] z-60 w-56 overflow-hidden rounded-2xl border border-slate-100 bg-white p-2 shadow-[0_15px_45px_rgba(15,23,42,0.15)]">
                    <div className="border-b border-slate-100 px-3 py-3">
                      <p className="truncate text-sm font-bold text-slate-800">
                        {userData?.name || "My Account"}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Manage your account
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        closeMenus();
                        navigate("/my-profile");
                      }}
                      className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-slate-600 transition-colors hover:bg-[#edf8f6] hover:text-[#087568]"
                    >
                      <i className="fa-regular fa-user w-4 text-center" />
                      My Profile
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        closeMenus();
                        navigate("/my-appointments");
                      }}
                      className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-slate-600 transition-colors hover:bg-[#edf8f6] hover:text-[#087568]"
                    >
                      <i className="fa-regular fa-calendar-check w-4 text-center" />
                      My Appointments
                    </button>

                    <div className="my-1 border-t border-slate-100" />

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-red-500 transition-colors hover:bg-red-50"
                    >
                      <i className="fa-solid fa-arrow-right-from-bracket w-4 text-center" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  closeMenus();
                  navigate("/login");
                }}
                className="hidden cursor-pointer rounded-full bg-[#087568] px-5 py-3 text-sm font-bold text-white shadow-[0_4px_12px_rgba(8,117,104,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#075f55] hover:shadow-[0_7px_18px_rgba(8,117,104,0.25)] sm:inline-flex"
              >
                Create Account
                <i className="fa-solid fa-arrow-right ml-2 self-center text-xs" />
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setShowMenu((prev) => !prev)}
              aria-label={showMenu ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={showMenu}
              className="flex size-10 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white text-lg text-[#07566a] transition-colors hover:bg-slate-50 sm:size-11 md:hidden"
            >
              <i
                className={`fa-solid ${
                  showMenu ? "fa-xmark" : "fa-bars"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        {showMenu && (
          <div className="border-t border-slate-100 bg-white px-4 pt-3 pb-5 shadow-[0_12px_20px_rgba(15,23,42,0.06)] md:hidden sm:px-6">
            <ul className="m-0 flex list-none flex-col gap-1 p-0">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.path === "/"}
                    onClick={closeMenus}
                    className={({ isActive }) =>
                      `flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-bold no-underline transition-colors ${
                        isActive
                          ? "bg-[#eaf7f5] text-[#087568]"
                          : "text-slate-600 hover:bg-slate-50 hover:text-[#087568]"
                      }`
                    }
                  >
                    {item.name}
                    <i className="fa-solid fa-chevron-right text-[10px] opacity-60" />
                  </NavLink>
                </li>
              ))}

              {!token && (
                <li className="mt-2 border-t border-slate-100 pt-3 sm:hidden">
                  <button
                    type="button"
                    onClick={() => {
                      closeMenus();
                      navigate("/login");
                    }}
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#087568] px-4 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#075f55]"
                  >
                    <i className="fa-regular fa-user" />
                    Create Account
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;