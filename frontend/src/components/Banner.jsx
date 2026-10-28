import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <section className="mx-auto mt-4 max-w-300 rounded-2xl bg-[#9fe6f0] px-6 py-12 font-[system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,sans-serif] md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex-1 text-center md:text-left">
          <h1 className="mb-6 text-4xl leading-[1.2] font-bold text-slate-900 md:text-5xl">
            Book an Appointment
          </h1>

          <button
            type="button"
            className="cursor-pointer rounded-lg border-0 bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] active:translate-y-0"
            onClick={() => {
              navigate("/login");
              window.scrollTo(0, 0);
            }}
          >
            Create Account
          </button>
        </div>

        <div className="w-full flex-1">
          <img
            src={assets.banner}
            alt="Appointment booking illustration"
            className="block h-auto w-full rounded-xl object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;