import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const currencySymbol = "$";

  axios.defaults.withCredentials = true;

  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(false);
  const [userData, setUserData] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  const navigate = useNavigate();

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(
        `${backendurl}/api/doctors/list`
      );

      if (data.success) {
        setDoctors(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };


  const loadUserProfileImage = async () => {
    try {
      const { data } = await axios.get(
        `${backendurl}/api/user/get-profile`
      );

      if (data.success && data.user) {
        setUserData(data.user);
        setToken(true);
        return true;
      }

      setUserData(false);
      setToken(false);
      return false;
    } catch (error) {
      setUserData(false);
      setToken(false);
      return false;
    }
  };

  const logoutUser = async () => {
    try {
      await axios.post(`${backendurl}/api/user/logout`);
    } catch (error) {
      console.log(error);
    } finally {
      setToken(false);
      setUserData(false);
      toast.success("Logged out Successfully");
      navigate("/");
    }
  };

  const value = {
    doctors,
    currencySymbol,
    getDoctorsData,
    backendurl,
    token,
    setToken,
    userData,
    setUserData,
    logoutUser,
    loadUserProfileImage,
    authLoading,
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  useEffect(() => {
    const checkSession = async () => {
      await loadUserProfileImage();
      setAuthLoading(false);
    };

    checkSession();
  }, []);

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;