import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AdminAppContext";
import { assets } from "../../assets_admin/assets.js";

const DoctorAppointments = () => {
const {
appointments,
getAppointments,
completeAppointment,
cancelAppointment,
} = useContext(DoctorContext);

const { calculateAge, dateFormat, currency } = useContext(AppContext);

useEffect(() => {
getAppointments();
}, []);

const getStatus = (item) => {
if (item.cancelled) return "Cancelled";
if (item.isCompleted) return "Completed";
return "Pending";
};

const statusStyles = {
Cancelled: "border-rose-200 bg-rose-50 text-rose-700",
Completed: "border-emerald-200 bg-emerald-50 text-emerald-700",
Pending: "border-amber-200 bg-amber-50 text-amber-700",
};

return (
<div className="min-h-screen bg-slate-50 px-4 py-6 text-slate-800 sm:px-6 sm:py-8 lg:px-8">
<div className="mx-auto max-w-7xl">

<div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
<div>
<p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
Doctor Workspace
</p>

        <h1 className="text-3xl font-bold tracking-tight text-slate-800">
          All Appointments
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Manage patient bookings, review payments and update appointment
          status.
        </p>
      </div>

      <div className="flex w-fit items-center gap-3 rounded-2xl border border-indigo-100 bg-white px-5 py-3 shadow-sm">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <img
            src={assets.appointments_icon}
            alt=""
            className="h-6 w-6 object-contain"
          />
        </div>

        <div>
          <p className="text-2xl font-bold text-slate-800">
            {appointments?.length || 0}
          </p>
          <p className="text-xs font-medium text-slate-500">
            Total Appointments
          </p>
        </div>
      </div>
    </div>


    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
  
      <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
        <h2 className="text-lg font-bold text-slate-800">
          Appointment Records
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Patient details and appointment actions
        </p>
      </div>

      {!appointments || appointments.length === 0 ? (
        <div className="flex flex-col items-center px-5 py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50">
            <img
              src={assets.appointments_icon}
              alt=""
              className="h-8 w-8 object-contain opacity-70"
            />
          </div>

          <h3 className="mt-5 text-lg font-bold text-slate-800">
            No appointments found
          </h3>

          <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
            Patient appointments will appear here when bookings are
            available.
          </p>
        </div>
      ) : (
        <>
       
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-237.5 text-left">
              <thead className="bg-slate-50">
                <tr className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <th className="px-5 py-4">#</th>
                  <th className="px-5 py-4">Patient</th>
                  <th className="px-5 py-4">Payment</th>
                  <th className="px-5 py-4">Age</th>
                  <th className="px-5 py-4">Date & Time</th>
                  <th className="px-5 py-4">Fees</th>
                  <th className="px-5 py-4 text-center">Status / Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {appointments.map((item, index) => (
                  <tr
                    key={item._id || index}
                    className="transition-colors hover:bg-indigo-50/30"
                  >
                    <td className="px-5 py-4 text-sm font-medium text-slate-400">
                      {String(index + 1).padStart(2, "0")}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            item.userData?.image || assets.patients_icon
                          }
                          alt={item.userData?.name || "Patient"}
                          className="h-11 w-11 rounded-xl border border-slate-200 bg-slate-50 object-cover"
                        />
                        <div className="min-w-0">
                          <p className="max-w-45 truncate text-sm font-semibold text-slate-800">
                            {item.userData?.name || "Patient"}
                          </p>
                          <p className="mt-1 text-xs text-slate-400">
                            Patient
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold ${
                          item.payment
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                            : "border-slate-200 bg-slate-100 text-slate-600"
                        }`}
                      >
                        {item.payment ? "Online" : "Cash"}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {calculateAge(item.userData?.dob)}
                    </td>

                    <td className="px-5 py-4">
                      <p className="whitespace-nowrap text-sm font-medium text-slate-700">
                        {dateFormat(item.slotDate)}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        {item.slotTime}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-sm font-bold text-slate-800">
                      {currency}
                      {item.amount}
                    </td>

                    <td className="px-5 py-4">
                      {item.cancelled || item.isCompleted ? (
                        <div className="flex justify-center">
                          <span
                            className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold ${statusStyles[getStatus(item)]}`}
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-current" />
                            {getStatus(item)}
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            aria-label="Cancel appointment"
                            title="Cancel appointment"
                            onClick={() => cancelAppointment(item._id)}
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-rose-200 bg-rose-50 transition hover:border-rose-300 hover:bg-rose-100 focus:outline-none focus:ring-2 focus:ring-rose-200"
                          >
                            <img
                              src={assets.cancel_icon}
                              alt=""
                              className="h-4 w-4 object-contain"
                            />
                          </button>

                          <button
                            type="button"
                            aria-label="Complete appointment"
                            title="Mark as completed"
                            onClick={() => completeAppointment(item._id)}
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 transition hover:border-emerald-300 hover:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                          >
                            <img
                              src={assets.tick_icon}
                              alt=""
                              className="h-4 w-4 object-contain"
                            />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

    
          <div className="divide-y divide-slate-100 lg:hidden">
            {appointments.map((item, index) => (
              <div
                key={item._id || index}
                className="p-4 transition-colors hover:bg-indigo-50/30 sm:p-5"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={item.userData?.image || assets.patients_icon}
                    alt={item.userData?.name || "Patient"}
                    className="h-12 w-12 shrink-0 rounded-xl border border-slate-200 bg-slate-50 object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="truncate font-semibold text-slate-800">
                        {item.userData?.name || "Patient"}
                      </h3>

                      <span
                        className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${
                          item.payment
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                            : "border-slate-200 bg-slate-100 text-slate-600"
                        }`}
                      >
                        {item.payment ? "Online" : "Cash"}
                      </span>
                    </div>

                    <p className="mt-1 text-xs text-slate-500">
                      Appointment #{index + 1}
                    </p>

                    <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
                      <div>
                        <p className="text-xs text-slate-400">Age</p>
                        <p className="mt-1 text-sm font-medium text-slate-700">
                          {calculateAge(item.userData?.dob)}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-400">Fees</p>
                        <p className="mt-1 text-sm font-bold text-slate-800">
                          {currency}
                          {item.amount}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-400">Date</p>
                        <p className="mt-1 text-sm font-medium text-slate-700">
                          {dateFormat(item.slotDate)}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-400">Time</p>
                        <p className="mt-1 text-sm font-medium text-slate-700">
                          {item.slotTime}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-3">
                      <span
                        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${statusStyles[getStatus(item)]}`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {getStatus(item)}
                      </span>

                      {!item.cancelled && !item.isCompleted && (
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => cancelAppointment(item._id)}
                            aria-label="Cancel appointment"
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-rose-200 bg-rose-50 transition hover:bg-rose-100"
                          >
                            <img
                              src={assets.cancel_icon}
                              alt=""
                              className="h-4 w-4 object-contain"
                            />
                          </button>

                          <button
                            type="button"
                            onClick={() => completeAppointment(item._id)}
                            aria-label="Complete appointment"
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 transition hover:bg-emerald-100"
                          >
                            <img
                              src={assets.tick_icon}
                              alt=""
                              className="h-4 w-4 object-contain"
                            />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>

    <p className="mt-6 text-center text-xs text-slate-400">
      DocSlot · Doctor Workspace
    </p>
  </div>
</div>

);
};

export default DoctorAppointments;