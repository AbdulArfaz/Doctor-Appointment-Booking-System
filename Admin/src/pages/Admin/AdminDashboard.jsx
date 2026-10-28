import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext.jsx";
import { assets } from "../../assets_admin/assets.js";
import { AppContext } from "../../context/AdminAppContext.jsx";

const Dashboard = () => {
const { dashData, getDashData, adminAppointmentCancel } =
useContext(AdminContext);

const { dateFormat } = useContext(AppContext);

useEffect(() => {
getDashData();
}, []);

if (!dashData) {
return (
<div className="flex min-h-[60vh] items-center justify-center bg-slate-50 px-4">
<div className="flex flex-col items-center gap-4">
<div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />
<p className="text-sm font-medium text-slate-500">
Loading your dashboard...
</p>
</div>
</div>
);
}

const stats = [
{
label: "Total Doctors",
value: dashData.doctors ?? 0,
image: assets.doctor_icon,
gradient: "from-blue-50 to-white",
iconBg: "bg-blue-100",
accent: "text-blue-600",
border: "hover:border-blue-200",
},
{
label: "Appointments",
value: dashData.appointments ?? 0,
image: assets.appointments_icon,
gradient: "from-violet-50 to-white",
iconBg: "bg-violet-100",
accent: "text-violet-600",
border: "hover:border-violet-200",
},
{
label: "Total Patients",
value: dashData.patients ?? 0,
image: assets.patients_icon,
gradient: "from-emerald-50 to-white",
iconBg: "bg-emerald-100",
accent: "text-emerald-600",
border: "hover:border-emerald-200",
},
];

const latestAppointments = dashData.latestAppointments ?? [];

return (
<div className="min-h-screen bg-slate-50 px-4 py-6 text-slate-800 sm:px-6 sm:py-8 lg:px-8">
<div className="mx-auto max-w-7xl">

<div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
<div>
<p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
DocSlot Administration
</p>

        <h1 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
          Dashboard{" "}
          <span className="bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            Overview
          </span>
        </h1>

        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
          Monitor your doctors, patients and appointments in one place.
        </p>
      </div>

      <div className="flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2.5">
        <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
        <span className="text-xs font-semibold text-emerald-700">
          Dashboard Active
        </span>
      </div>
    </div>

  
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-linear-to-br ${stat.gradient} p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-100/50 sm:p-6 ${stat.border}`}
        >
          <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-indigo-100/40 transition-transform duration-500 group-hover:scale-150" />

          <div className="relative flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-slate-500">
                {stat.label}
              </p>

              <p className="mt-3 text-4xl font-bold tracking-tight text-slate-800 sm:text-5xl">
                {stat.value}
              </p>

              <p className={`mt-3 text-xs font-semibold ${stat.accent}`}>
                Current total
              </p>
            </div>

            <div
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${stat.iconBg} ring-1 ring-black/5 transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110 sm:h-16 sm:w-16`}
            >
              <img
                src={stat.image}
                alt=""
                className="h-7 w-7 object-contain sm:h-8 sm:w-8"
              />
            </div>
          </div>
        </div>
      ))}
    </div>

  
    <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:mt-10">
      <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 ring-1 ring-indigo-100">
            <img
              src={assets.list_icon}
              alt=""
              className="h-5 w-5 object-contain"
            />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-800 sm:text-xl">
              Latest Bookings
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Recent appointment activity
            </p>
          </div>
        </div>

        <span className="w-fit rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700">
          {latestAppointments.length} recent{" "}
          {latestAppointments.length === 1 ? "booking" : "bookings"}
        </span>
      </div>

      {latestAppointments.length === 0 ? (
        <div className="flex flex-col items-center px-5 py-14 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
            <img
              src={assets.appointments_icon}
              alt=""
              className="h-7 w-7 object-contain opacity-70"
            />
          </div>

          <p className="font-semibold text-slate-800">
            No appointments yet
          </p>

          <p className="mt-1 text-sm text-slate-500">
            New bookings will appear here.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {latestAppointments.map((item, index) => (
            <div
              key={item._id || index}
              className="group flex flex-col gap-4 px-5 py-4 transition-colors duration-200 hover:bg-indigo-50/40 sm:flex-row sm:items-center sm:justify-between sm:px-7"
            >
         
              <div className="flex min-w-0 items-center gap-3">
                <div className="relative shrink-0">
                  <img
                    className="h-12 w-12 rounded-2xl border border-slate-200 bg-slate-50 object-cover sm:h-14 sm:w-14"
                    src={item.docData?.image || assets.doctor_icon}
                    alt={item.docData?.name || "Doctor"}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = assets.doctor_icon;
                    }}
                  />

                  <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-indigo-500" />
                </div>

                <div className="min-w-0">
                  <p className="truncate font-semibold text-slate-800 transition-colors group-hover:text-indigo-700">
                    {item.docData?.name || "Doctor"}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Appointment #{index + 1}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {dateFormat(item.slotDate)}
                    {item.slotTime ? ` · ${item.slotTime}` : ""}
                  </p>
                </div>
              </div>

          
              <div className="flex items-center justify-between gap-3 sm:justify-end">
                {item.cancelled ? (
                  <span className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                    Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Completed
                  </span>
                ) : (
                  <>
                    <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                      Pending
                    </span>

                    <button
                      type="button"
                      title="Cancel appointment"
                      aria-label={`Cancel appointment for ${item.docData?.name || "doctor"}`}
                      onClick={() => adminAppointmentCancel(item._id)}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-rose-200 bg-white transition-all duration-200 hover:border-rose-300 hover:bg-rose-50 focus:outline-none focus:ring-2 focus:ring-rose-200"
                    >
                      <img
                        src={assets.cancel_icon}
                        alt=""
                        className="h-4 w-4 object-contain"
                      />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>

  
    <p className="mt-6 text-center text-xs text-slate-400">
      DocSlot · Administration Dashboard
    </p>
  </div>
</div>

);
};

export default Dashboard;