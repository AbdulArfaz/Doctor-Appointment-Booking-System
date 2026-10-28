import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Appointment = () => {
  const { drId } = useParams();
  const { doctors, currencySymbol, backendurl, token, getDoctorsData } =
    useContext(AppContext);
  const [drInfo, setDrInfo] = useState(null);
  const navigate = useNavigate();
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const getDocInfo = () => {
    if (!doctors || doctors.length === 0) return;
    const cleanDrId = String(drId).replace(":", "").trim();
    const foundDoctor = doctors.find(
      (doc) => String(doc._id) === cleanDrId || String(doc._id) === cleanDrId
    );
    if (foundDoctor) {
      setDrInfo(foundDoctor);
    }
  };

  const getAvailableSlots = async () => {
    setDocSlots([]);
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      if (currentDate.getDay() === 0) {
        continue;
      }

      let endTime = new Date(today);
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = `${day}_${month}_${year}`;
        const slotTime = formattedTime;

        const bookedSlots = drInfo?.slots_booked?.[slotDate] || [];

        const isBooked = bookedSlots.some(
          (time) => time.toLowerCase().trim() === slotTime.toLowerCase().trim()
        );
        if (!isBooked) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 60);
      }
      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book Appointment");
      return navigate("/login");
    }
    if (!slotTime) {
      return toast.warn("Please select a time slot first");
    }
    try {
      if (
        !docSlots ||
        !docSlots[slotIndex] ||
        !docSlots[slotIndex].length === 0
      ) {
        return toast.error("Selected slot is invalid or unavailable");
      }
      const date = docSlots[slotIndex][0].datetime;

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      const slotDate = `${day}_${month}_${year}`;

      const { data } = await axios.post(
        `${backendurl}/api/user/book-appointment`,
        { docId: drInfo._id, slotDate, slotTime }
      );
      if (data.success) {
        toast.success(data.message);
        await getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went Wrong";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    if (drInfo) {
      getAvailableSlots();
    }
  }, [drInfo]);

  useEffect(() => {
    getDocInfo();
  }, [doctors, drId]);

  return (
    <div className="mx-auto my-10 max-w-225 px-5 font-[Inter,Arial,sans-serif]">
      {/* Doctor Card */}
      <div className="flex flex-col gap-8 rounded-3xl border border-gray-200 bg-white/90 p-5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08)] min-[641px]:flex-row sm:p-8">
        <div className="h-65 w-full shrink-0 overflow-hidden rounded-[18px] bg-[linear-gradient(135deg,#eef2ff_0%,#e0e7ff_100%)] min-[641px]:h-80 min-[641px]:w-70">
          <img
            src={drInfo?.image}
            alt={drInfo?.name}
            className="h-full w-full object-cover object-top transition-transform duration-400 hover:scale-[1.04]"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="mb-2 flex items-center gap-2">
            <h2 className="m-0 text-[1.75rem] font-bold tracking-[-0.02em] text-gray-800">
              {drInfo?.name}
            </h2>

            {assets?.verified_icon && (
              <img
                src={assets.verified_icon}
                alt="verified"
                className="size-5"
              />
            )}
          </div>

          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="text-[0.925rem] font-medium text-gray-600">
              {drInfo?.degree} - {drInfo?.speciality}
            </span>

            <span className="rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
              {drInfo?.experience}
            </span>
          </div>

          <div className="mb-5 rounded-2xl border border-gray-100 bg-gray-50 p-4.5">
            <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-gray-900">
              About
              {assets?.info_icon && (
                <img
                  src={assets.info_icon}
                  alt="info"
                  className="size-3.75 opacity-60"
                />
              )}
            </p>

            <p className="m-0 text-sm leading-[1.6] text-gray-600">
              {drInfo?.about}
            </p>
          </div>

          <p className="m-0 flex flex-wrap items-center gap-2 text-[0.95rem] font-medium text-gray-600">
            Appointment Fee:
            <span className="rounded-lg bg-gray-100 px-2.5 py-1 text-[1.1rem] font-bold text-gray-900">
              {currencySymbol}-{drInfo?.fees}
            </span>
          </p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className="mt-8 rounded-[20px] border border-slate-200 bg-white p-5 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] sm:p-7">
        <p className="mb-5 text-lg font-bold text-slate-900">Booking slots</p>

        <div className="flex scrollbar-none gap-3 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden">
          {docSlots.length > 0 &&
            docSlots.map((item, index) => (
              <div
                key={index}
                onClick={() => setSlotIndex(index)}
                className={`flex h-21 min-w-16 shrink-0 cursor-pointer flex-col items-center justify-center rounded-2xl border-[1.5px] transition-all duration-200 hover:-translate-y-0.5 ${
                  slotIndex === index
                    ? "border-indigo-600 bg-[linear-gradient(135deg,#4f46e5_0%,#3730a3_100%)] shadow-[0_8px_16px_-4px_rgba(79,70,229,0.4)]"
                    : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-slate-100"
                }`}
              >
                <p
                  className={`m-0 text-xs font-semibold tracking-[0.5px] uppercase ${
                    slotIndex === index ? "text-indigo-200" : "text-slate-500"
                  }`}
                >
                  {item[0] && daysOfWeek[item[0]?.datetime?.getDay()]}
                </p>

                <p
                  className={`m-0 mt-1 text-lg font-bold ${
                    slotIndex === index ? "text-white" : "text-slate-900"
                  }`}
                >
                  {item[0] && item[0]?.datetime?.getDate()}
                </p>
              </div>
            ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {docSlots.length > 0 &&
            docSlots[slotIndex]?.map((item, index) => (
              <p
                key={index}
                onClick={() => setSlotTime(item.time)}
                className={`m-0 cursor-pointer rounded-xl border-[1.5px] px-5 py-2.5 text-[0.813rem] font-semibold transition-all duration-200 ${
                  item.time === slotTime
                    ? "border-indigo-600 bg-indigo-50 font-bold text-indigo-600 shadow-[0_0_0_1px_#4f46e5]"
                    : "border-slate-200 bg-white text-slate-500 hover:border-indigo-500 hover:bg-slate-50 hover:text-indigo-600"
                }`}
              >
                {item.time.toLowerCase()}
              </p>
            ))}
        </div>

        <button
          onClick={bookAppointment}
          className="mt-8 rounded-full bg-[linear-gradient(135deg,#4f46e5_0%,#4338ca_100%)] px-9 py-3.5 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(79,70,229,0.35)] transition-all duration-250 hover:-translate-y-px hover:bg-[linear-gradient(135deg,#4338ca_0%,#3730a3_100%)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.45)] active:translate-y-0"
        >
          Book an appointment
        </button>
      </div>

      <RelatedDoctors drId={drId} speciality={drInfo?.speciality} />
    </div>
  );
};

export default Appointment;
