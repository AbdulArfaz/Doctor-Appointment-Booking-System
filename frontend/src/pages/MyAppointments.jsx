import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import "../styles/MyAppointments.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const MyAppointments = () => {
  const { backendurl, token, getDoctorsData } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);

  const months = [
    " ",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendurl}/api/user/appointments`);

      if (data.success) {
        const reverseAppointments = [...data.data].reverse();
        setAppointments(reverseAppointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendurl}/api/user/cancel-appointment`,
        { appointmentId }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Cancel Error:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const initPay = (order, appointmentId) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Doctor Appointment Fee",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            `${backendurl}/api/user/verify-razorpay`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              appointmentId,
            }
          );

          if (data.success) {
            toast.success("Payment Successful!");
            getUserAppointments();
            getDoctorsData();
          }
        } catch (error) {
          console.error("Verification Error:", error);
          toast.error(
            error.response?.data?.message || "Payment verification failed",
          );
        }
      },
      theme: {
        color: "#5f6FFF",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendurl}/api/user/payment-razorpay`,
        { appointmentId }
      );
      if (data.success) {
        initPay(data.data, appointmentId);
      }
    } catch (error) {
      console.error("Order Error:", error);
      toast.error(
        error.response?.data?.message || "Failed to initiate payment",
      );
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    } else {
      setAppointments([])
    }
  }, [token]);

  return (
<div className="mx-auto w-full max-w-200 text-slate-700">
  <h2 className="mb-4 border-b border-slate-200 pb-2 text-xl font-normal text-slate-800">
    My Appointments
  </h2>

  <div className="flex flex-col gap-4">
    {appointments.map((item, index) => (
      <div
        key={index}
        className="flex flex-col items-center gap-5 rounded-lg border border-slate-200 bg-white p-4 sm:flex-row sm:text-left"
      >
        <img
          src={item.docData.image}
          alt={item.docData.name}
          className="size-25 shrink-0 rounded-md bg-slate-100 object-cover"
        />

        <div className="min-w-0 flex-1 text-center text-sm leading-[1.4] sm:text-left">
          <h3 className="mb-1 text-[1.05rem] font-semibold text-slate-900">
            {item.docData.name}
          </h3>

          <p className="mb-2 text-slate-500">
            {item.docData.speciality}
          </p>

          <p className="my-1">
            <strong>Address:</strong>
            <br />
            {item.docData.address.line1}
            <br />
            {item.docData.address.line2}
          </p>

          <p className="my-1">
            <strong>Date &amp; Time:</strong>{" "}
            {dateFormat(item.slotDate)} | {item.slotTime}
          </p>
        </div>

        <div className="flex w-full flex-col gap-2 sm:w-auto sm:min-w-42.5">
          {!item.cancelled && item.payment && !item.isCompleted && (
            <button
              className="cursor-pointer rounded-md border border-transparent bg-blue-600 px-4 py-2 text-[0.85rem] text-white transition-colors duration-200 hover:bg-blue-700"
            >
              Paid
            </button>
          )}

          {!item.cancelled && !item.payment && !item.isCompleted && (
            <button
              onClick={() => appointmentRazorpay(item._id)}
              className="cursor-pointer rounded-md border border-transparent bg-blue-600 px-4 py-2 text-[0.85rem] text-white transition-colors duration-200 hover:bg-blue-700"
            >
              Pay Online
            </button>
          )}

          {!item.cancelled && !item.isCompleted && (
            <button
              onClick={() => cancelAppointment(item._id)}
              className="cursor-pointer rounded-md border border-slate-300 bg-transparent px-4 py-2 text-[0.85rem] text-slate-500 transition-colors duration-200 hover:border-red-300 hover:bg-red-50 hover:text-red-500"
            >
              Cancel Appointment
            </button>
          )}

          {item.cancelled && !item.isCompleted && (
            <button
              className="cursor-default rounded-md border border-transparent bg-blue-600 px-4 py-2 text-[0.85rem] text-white"
            >
              Appointment Cancelled
            </button>
          )}

          {item.isCompleted && (
            <button
              className="cursor-default rounded-md border border-transparent bg-green-800 px-4 py-2 text-base font-semibold text-white transition-colors duration-200 hover:bg-green-700"
            >
              Completed
            </button>
          )}
        </div>
      </div>
    ))}
  </div>
</div>
  );
};

export default MyAppointments;
