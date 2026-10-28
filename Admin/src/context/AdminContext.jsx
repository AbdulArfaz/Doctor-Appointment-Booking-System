import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [doctorslist, setDoctorslist] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);

  // HttpOnly cookie is managed by the browser.
  const backendurl = import.meta.env.VITE_BACKEND_URL;

  // Send cookies with cross-origin requests.
  const api = axios.create({
    baseURL: backendurl,
    withCredentials: true,
  });

  const getAllDoctorsList = async () => {
    try {
      const { data } = await api.post("/api/admin/all-doctors", {});

      if (data.success) {
        setDoctorslist(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message
      );
    }
  };

  const changeAvailability = async (docId) => {
    try {
      const { data } = await api.post(
        "/api/admin/change-availability",
        { docId }
      );

      if (data.success) {
        toast.success(data.message);
        await getAllDoctorsList();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message
      );
    }
  };

  const getAllAppointments = async () => {
    try {
      const { data } = await api.get("/api/admin/appointments");

      if (data.success) {
        setAppointments(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message
      );
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await api.get("/api/admin/dashboard");

      if (data.success) {
        setDashData(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message
      );
    }
  };

  const adminAppointmentCancel = async (appointmentId) => {
    try {
      const { data } = await api.post(
        "/api/admin/cancel-appointment",
        { appointmentId }
      );

      if (data.success) {
        toast.success(data.message);
        await getDashData();
        await getAllAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message
      );
    }
  };

  const value = {
    backendurl,
    doctorslist,
    getAllDoctorsList,
    changeAvailability,
    appointments,
    setAppointments,
    getAllAppointments,
    adminAppointmentCancel,
    dashData,
    setDashData,
    getDashData,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;