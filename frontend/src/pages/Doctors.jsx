import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  const [filter, setFilter] = useState([]);
  const navigate = useNavigate();

  const { doctors } = useContext(AppContext);

  const specialities = [
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "General Physician",
    "Gastroenterologist",
  ];

  useEffect(() => {
    if (speciality) {
      setFilter(
        doctors?.filter((doc) => doc.speciality === speciality) || []
      );
    } else {
      setFilter(doctors || []);
    }
  }, [doctors, speciality]);

  return (
    <section className="mx-auto box-border w-full max-w-360 px-4 py-8 text-slate-800 sm:px-6 lg:px-10 lg:py-12">
      {/* Page Heading */}
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Find Your Doctor
        </h1>
        <p className="m-0 text-sm leading-6 text-slate-500 sm:text-base">
          Browse through our list of trusted medical specialists.
        </p>
      </div>

      {/* Main Layout */}
      <div className="grid min-w-0 grid-cols-1 items-start gap-7 min-[768px]:grid-cols-[220px_minmax(0,1fr)] min-[768px]:gap-8 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-10">
        {/* Speciality Sidebar */}
        <aside className="min-w-0">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500">
            Filter by speciality
          </h2>

          <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none [&::-webkit-scrollbar]:hidden min-[768px]:sticky min-[768px]:top-6 min-[768px]:flex-col min-[768px]:overflow-visible min-[768px]:pb-0">
            {/* All Doctors */}
            <Link
              to="/doctors"
              className={`flex h-11 w-max shrink-0 items-center justify-center rounded-xl border px-4 text-sm font-medium no-underline transition-colors duration-200 min-[768px]:h-12 min-[768px]:w-full min-[768px]:justify-start ${
                !speciality
                  ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                  : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:bg-slate-50"
              }`}
            >
              All Doctors
            </Link>

            {specialities.map((item) => {
              const isActive = speciality === item;

              return (
                <Link
                  key={item}
                  to={isActive ? "/doctors" : `/doctors/${item}`}
                  className={`flex h-11 w-max shrink-0 items-center justify-center rounded-xl border px-4 text-sm font-medium no-underline transition-colors duration-200 min-[768px]:h-12 min-[768px]:w-full min-[768px]:justify-start ${
                    isActive
                      ? "border-indigo-600 bg-indigo-50 font-semibold text-indigo-700"
                      : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:bg-slate-50"
                  }`}
                >
                  {item}
                </Link>
              );
            })}
          </div>
        </aside>

        {/* Doctors Grid */}
        <div className="grid min-w-0 grid-cols-[repeat(auto-fill,minmax(min(100%,220px),1fr))] gap-5 sm:gap-6 lg:gap-7">
          {filter.map((item) => (
            <Link
              key={item._id}
              to={`/appointment/${item._id}`}
              onClick={() => window.scrollTo(0, 0)}
              className="group block min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white text-inherit no-underline shadow-[0_3px_12px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-[0_14px_30px_rgba(15,23,42,0.09)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {/* Doctor Image */}
              <div className="flex h-52.5 items-end justify-center overflow-hidden bg-[#f0f3ff] sm:h-55">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-contain object-bottom transition-transform duration-300 group-hover:scale-[1.04]"
                />
              </div>

              {/* Doctor Details */}
              <div className="p-4 sm:p-5">
                <div
                  className={`mb-3 inline-flex min-h-6 items-center gap-2 rounded-full px-2.5 py-1 text-xs font-medium ${
                    item.available
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  <span className="relative flex size-2 shrink-0">
                    <span
                      className={`size-2 rounded-full ${
                        item.available ? "bg-emerald-500" : "bg-slate-400"
                      }`}
                    />
                    {item.available && (
                      <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-40" />
                    )}
                  </span>

                  {item.available ? "Available" : "Not available"}
                </div>

                <h3 className="mb-1 truncate text-base font-semibold text-slate-800 transition-colors group-hover:text-indigo-700 sm:text-[1.05rem]">
                  {item.name}
                </h3>

                <p className="m-0 text-sm leading-5 text-slate-500">
                  {item.speciality}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filter.length === 0 && (
        <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-12 text-center">
          <h3 className="mb-2 text-lg font-semibold text-slate-800">
            No doctors found
          </h3>
          <p className="m-0 text-sm text-slate-500">
            Try selecting another speciality to see available doctors.
          </p>
          {speciality && (
            <button
              type="button"
              onClick={() => navigate("/doctors")}
              className="mt-5 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
            >
              View all doctors
            </button>
          )}
        </div>
      )}
    </section>
  );
};

export default Doctors;