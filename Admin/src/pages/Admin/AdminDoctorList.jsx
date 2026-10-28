import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const AdminDoctorList = () => {
const { doctorslist, getAllDoctorsList, changeAvailability } =
useContext(AdminContext);

useEffect(() => {
getAllDoctorsList();
}, []);

return (
<div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
<div className="mx-auto max-w-7xl">

<div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
<div>
<p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
Doctor Management
</p>

        <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
          All Doctors
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Manage your doctors and their availability.
        </p>
      </div>

      <div className="flex w-fit items-center gap-3 rounded-2xl border border-indigo-100 bg-white px-5 py-3 shadow-sm">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2m6-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm9-3v6m3-3h-6"
            />
          </svg>
        </div>

        <div>
          <p className="text-2xl font-bold text-slate-800">
            {doctorslist?.length || 0}
          </p>
          <p className="text-xs font-medium text-slate-500">
            Total Doctors
          </p>
        </div>
      </div>
    </div>

  
    {doctorslist?.length > 0 ? (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {doctorslist.map((item, index) => (
          <div
            key={item._id || index}
            className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/50"
          >
           
            <div className="relative overflow-hidden bg-linear-to-br from-indigo-50 via-blue-50 to-slate-100">
              <div className="flex h-56 items-end justify-center overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-contain object-bottom transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="absolute left-4 top-4">
                <span className="rounded-full border border-white/80 bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm backdrop-blur">
                  Doctor #{index + 1}
                </span>
              </div>
            </div>

         
            <div className="p-5">
              <h2 className="truncate text-lg font-bold text-slate-800 transition group-hover:text-indigo-700">
                {item.name}
              </h2>

              <p className="mt-1 text-sm font-medium text-slate-500">
                {item.speciality}
              </p>

              <div className="my-5 border-t border-slate-100" />

            
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-medium text-slate-400">
                    Current Status
                  </p>

                  <div className="mt-1.5 flex items-center gap-2">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        item.available
                          ? "bg-emerald-500"
                          : "bg-rose-500"
                      }`}
                    />

                    <span
                      className={`text-sm font-semibold ${
                        item.available
                          ? "text-emerald-700"
                          : "text-rose-600"
                      }`}
                    >
                      {item.available ? "Available" : "Unavailable"}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={Boolean(item.available)}
                  aria-label={`Change availability for ${item.name}`}
                  onClick={() => changeAvailability(item._id)}
                  className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-100 ${
                    item.available ? "bg-emerald-500" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-200 ${
                      item.available ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2m6-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7-1v6m3-3h-6"
            />
          </svg>
        </div>

        <h3 className="mt-5 text-lg font-bold text-slate-800">
          No doctors found
        </h3>

        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
          There are no doctors to display right now. Add a doctor to see
          their profile here.
        </p>
      </div>
    )}
  </div>
</div>

);
};

export default AdminDoctorList;