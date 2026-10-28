import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext.jsx";
import { AppContext } from "../../context/AdminAppContext.jsx";
import { assets } from "../../assets_admin/assets.js";

const AdminAllAppointments = () => {
  const {
    appointments,
    getAllAppointments,
    adminAppointmentCancel,
  } = useContext(AdminContext);

  const { calculateAge, dateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    getAllAppointments();
  }, []);

  const getStatus = (item) => {
    if (item.cancelled) return "Cancelled";
    if (item.isCompleted) return "Completed";
    return "Upcoming";
  };

  const statusStyles = {
    Cancelled: "bg-rose-50 text-rose-600 ring-rose-200",
    Completed: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    Upcoming: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  };

  const AppointmentStatus = ({ item }) => {
    const status = getStatus(item);

    return (
      <span
        className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${
          statusStyles[status]
        }`}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            status === "Cancelled"
              ? "bg-rose-500"
              : status === "Completed"
                ? "bg-emerald-500"
                : "bg-indigo-500"
          }`}
        />
        {status}
      </span>
    );
  };

  const sortedAppointments = [...appointments].reverse();

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-indigo-50/40 to-violet-50/50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">

      
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-indigo-700 via-indigo-600 to-violet-600 p-6 text-white shadow-xl shadow-indigo-200/60 sm:p-8">
          <div className="pointer-events-none absolute -right-10 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 right-1/3 h-48 w-48 rounded-full bg-fuchsia-400/20 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wider text-indigo-50 backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-300" />
                APPOINTMENT MANAGEMENT
              </span>

              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                All appointments
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-indigo-100 sm:text-base">
                Manage patient visits, review booking details and track
                appointment status in one place.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-md sm:self-auto">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <rect x="3" y="5" width="18" height="16" rx="2" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 3v4M8 3v4M3 10h18M8 14h3"
                  />
                </svg>
              </div>

              <div>
                <p className="text-2xl font-bold tabular-nums">
                  {appointments.length}
                </p>
                <p className="text-xs text-indigo-100">Total bookings</p>
              </div>
            </div>
          </div>
        </div>

      
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-4 rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-indigo-100 to-violet-100 text-indigo-700">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-6 w-6" aria-hidden="true">
                <circle cx="12" cy="8" r="4" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 21a8 8 0 0 1 16 0" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-slate-500">Total appointments</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">
                {appointments.length}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-100 to-teal-100 text-emerald-700">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4L19 6" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-slate-500">Completed</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">
                {appointments.filter((item) => item.isCompleted && !item.cancelled).length}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-rose-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-rose-100 to-pink-100 text-rose-700">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="m7 7 10 10M17 7 7 17" />
                <circle cx="12" cy="12" r="9" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-slate-500">Cancelled</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">
                {appointments.filter((item) => item.cancelled).length}
              </p>
            </div>
          </div>
        </div>

      
        <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-2 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:px-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Appointment records
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Patient, doctor, schedule and booking status
              </p>
            </div>

            <span className="w-fit rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700">
              {appointments.length} records
            </span>
          </div>

        
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-250 text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/80 text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-5 py-4 font-semibold">#</th>
                  <th className="px-5 py-4 font-semibold">Patient</th>
                  <th className="px-5 py-4 font-semibold">Age</th>
                  <th className="px-5 py-4 font-semibold">Date & time</th>
                  <th className="px-5 py-4 font-semibold">Doctor</th>
                  <th className="px-5 py-4 font-semibold">Fees</th>
                  <th className="px-5 py-4 font-semibold">Status / action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {sortedAppointments.map((item, index) => (
                  <tr
                    key={item._id || index}
                    className="transition-colors hover:bg-indigo-50/30"
                  >
                    <td className="px-5 py-4 text-sm font-medium text-slate-400">
                      {index + 1}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          className="h-10 w-10 rounded-xl border border-slate-100 bg-slate-50 object-cover"
                          src={item.userData.image || assets.patients_icon}
                          alt=""
                        />
                        <span className="max-w-36 truncate text-sm font-semibold text-slate-800">
                          {item.userData.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {calculateAge(item.userData.dob)}
                    </td>

                    <td className="px-5 py-4">
                      <p className="whitespace-nowrap text-sm font-semibold text-slate-800">
                        {dateFormat(item.slotDate)}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {item.slotTime}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          className="h-10 w-10 rounded-xl border border-indigo-100 bg-indigo-50 object-cover"
                          src={item.docData.image || assets.patients_icon}
                          alt=""
                        />
                        <span className="max-w-36 truncate text-sm font-medium text-slate-700">
                          {item.docData.name}
                        </span>
                      </div>
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-sm font-bold text-slate-800">
                      {currency}{item.amount}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex flex-col items-start gap-2">
                        <AppointmentStatus item={item} />

                        {!item.cancelled && !item.isCompleted && (
                          <button
                            type="button"
                            onClick={() => adminAppointmentCancel(item._id)}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 bg-white px-3 py-1.5 text-xs font-semibold text-rose-600 transition hover:border-rose-300 hover:bg-rose-50 focus:outline-none focus:ring-4 focus:ring-rose-100"
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3.5 w-3.5" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m7 7 10 10M17 7 7 17" />
                              <circle cx="12" cy="12" r="9" />
                            </svg>
                            Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

   
          <div className="grid grid-cols-1 gap-4 bg-slate-50/60 p-4 sm:p-5 lg:hidden">
            {sortedAppointments.map((item, index) => (
              <article
                key={item._id || index}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-indigo-200 hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Appointment #{index + 1}
                  </span>
                  <AppointmentStatus item={item} />
                </div>

                <div className="space-y-4 p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.userData.image || assets.patients_icon}
                      alt=""
                      className="h-12 w-12 rounded-xl border border-slate-100 bg-slate-50 object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-slate-500">
                        Patient
                      </p>
                      <p className="truncate font-bold text-slate-900">
                        {item.userData.name}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500">
                        Age: {calculateAge(item.userData.dob)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl bg-indigo-50/70 p-3">
                    <img
                      src={item.docData.image || assets.patients_icon}
                      alt=""
                      className="h-11 w-11 rounded-xl border border-white bg-white object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-slate-500">
                        Consulting doctor
                      </p>
                      <p className="truncate text-sm font-semibold text-slate-800">
                        {item.docData.name}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-slate-100 p-3">
                      <p className="text-xs text-slate-500">Date & time</p>
                      <p className="mt-1 text-sm font-semibold text-slate-800">
                        {dateFormat(item.slotDate)}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {item.slotTime}
                      </p>
                    </div>

                    <div className="rounded-xl border border-slate-100 p-3">
                      <p className="text-xs text-slate-500">Consultation fee</p>
                      <p className="mt-1 text-lg font-bold text-indigo-700">
                        {currency}{item.amount}
                      </p>
                    </div>
                  </div>

                  {!item.cancelled && !item.isCompleted && (
                    <button
                      type="button"
                      onClick={() => adminAppointmentCancel(item._id)}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-100 focus:outline-none focus:ring-4 focus:ring-rose-100"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m7 7 10 10M17 7 7 17" />
                        <circle cx="12" cy="12" r="9" />
                      </svg>
                      Cancel appointment
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>

     
          {appointments.length === 0 && (
            <div className="px-5 py-16 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-100 to-violet-100 text-indigo-600">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-8 w-8" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="16" rx="2" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 3v4M8 3v4M3 10h18" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-800">
                No appointments yet
              </h3>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                New patient bookings will appear here when appointments are
                created.
              </p>
            </div>
          )}
        </section>

        <p className="px-1 text-xs text-slate-400">
          Appointment records are displayed with the latest bookings first.
        </p>
      </div>
    </div>
  );
};

export default AdminAllAppointments;