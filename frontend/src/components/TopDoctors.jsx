import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <section className="flex flex-col items-center gap-5 bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)] px-6 py-20 font-[system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,sans-serif]">
      <h1 className="m-0 text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Top Doctors to Book
      </h1>

      <p className="m-0 max-w-120 text-center text-[0.95rem] leading-relaxed text-slate-500">
        Simply browse through our extensive list of trusted doctors and
        schedule your visit seamlessly.
      </p>

      <div className="grid w-full max-w-287.5 grid-cols-[repeat(auto-fill,minmax(min(100%,210px),1fr))] gap-6 pt-8 lg:grid-cols-5">
        {doctors.slice(0, 10).map((item, index) => (
          <button
            type="button"
            key={item._id || index}
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              window.scrollTo(0, 0);
            }}
            className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-0 text-left shadow-[0_4px_6px_-1px_rgba(0,0,0,0.03),0_2px_4px_-2px_rgba(0,0,0,0.03)] transition-all duration-400 ease-in-out hover:-translate-y-2 hover:border-slate-300 hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.08),0_8px_10px_-6px_rgba(0,0,0,0.03)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <div className="flex h-55 w-full items-end justify-center overflow-hidden bg-[linear-gradient(135deg,#e0e7ff_0%,#eef2ff_100%)]">
              <img
                src={item.image}
                alt={item.name}
                className="h-55 w-full object-contain object-top transition-transform duration-500 ease-in-out group-hover:scale-105"
              />
            </div>

            <div className="p-5">
              <div
                className={`mb-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                  item.available
                    ? "bg-green-50 text-green-600"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                <span
                  className={`inline-block size-1.5 rounded-full ${
                    item.available
                      ? "bg-green-500 shadow-[0_0_0_2px_rgba(34,197,94,0.2)]"
                      : "bg-gray-400 shadow-[0_0_0_2px_rgba(156,163,175,0.2)]"
                  }`}
                />

                {item.available ? "Available" : "Not available"}
              </div>

              <p className="mb-1 mt-1 text-base font-semibold text-slate-900 transition-colors duration-200 group-hover:text-blue-600">
                {item.name}
              </p>

              <p className="m-0 text-[0.825rem] text-slate-500">
                {item.speciality}
              </p>
            </div>
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => {
          navigate("/doctors");
          window.scrollTo(0, 0);
        }}
        className="mt-10 cursor-pointer rounded-full border-0 bg-indigo-100 px-14 py-3.5 text-sm font-semibold text-indigo-800 shadow-[0_2px_4px_rgba(0,0,0,0.02)] transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-indigo-600 hover:text-white hover:shadow-[0_10px_15px_-3px_rgba(79,70,229,0.3)]"
      >
        More
      </button>
    </section>
  );
};

export default TopDoctors;