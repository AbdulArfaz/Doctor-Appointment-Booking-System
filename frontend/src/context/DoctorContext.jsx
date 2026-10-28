import { useState, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const backendurl = import.meta.env.VITE_BACKEND_URL;

  const api = axios.create({
    baseURL: backendurl,
    withCredentials: true,
  });

  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);
  const [profileData, setProfileData] = useState(false);

  const getAppointments = async () => {
    try {
      const { data } = await api.get("/api/doctors/appointments");

      if (data.success) {
        setAppointments([...(data.data || [])].reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || error.message
      );
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await api.get("/api/doctors/doc-dashboard");

      if (data.success) {
        setDashData(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || error.message
      );
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await api.post(
        "/api/doctors/cancel-appointment",
        { appointmentId }
      );

      if (data.success) {
        toast.success(data.message);
        await getAppointments();
        await getDashData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || error.message
      );
    }
  };

  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await api.post(
        "/api/doctors/complete-appointment",
        { appointmentId }
      );

      if (data.success) {
        toast.success(data.message);

        await getAppointments();
        await getDashData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || error.message
      );
    }
  };

  const getProfileData = async () => {
    try {
      const { data } = await api.get("/api/doctors/doctor-profile");

      if (data.success) {
        const doctorData = data.data;

        if (typeof doctorData.address === "string") {
          doctorData.address = JSON.parse(
            doctorData.address || "{}"
          );
        }

        setProfileData(doctorData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || error.message
      );
    }
  };

  const value = {
    backendurl,
    appointments,
    setAppointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
    dashData,
    setDashData,
    getDashData,
    profileData,
    setProfileData,
    getProfileData,
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;