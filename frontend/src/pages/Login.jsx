import React, { useContext, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const { backendurl, setToken, setUserData } = useContext(AppContext);
  const navigate = useNavigate();

  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(`${backendurl}/api/user/register`, {
          name,
          email,
          password,
        });

        if (data.success) {
          toast.success("Account created! Please log in.");
          setState("Login");
          setPassword("");
        } else {
          toast.error(data.message || "Registration failed");
        }

        return;
      }

      const { data } = await axios.post(
        `${backendurl}/api/user/login`,
        { email, password },
        { withCredentials: true }
      );

      if (data.success && data.data?.user) {
        setUserData(data.data.user);
        setToken(true);
        toast.success("Logged in successfully");
        navigate("/");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        (error.response?.status === 404
          ? "User does not exist"
          : error.message || "Something went wrong");

      toast.error(message);
    }
  };

  const isSignUp = state === "Sign Up";

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto my-6 flex w-[calc(100%-2.5rem)] max-w-105 flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_12px_35px_rgba(31,41,55,0.09)] transition-shadow duration-300 hover:shadow-[0_16px_42px_rgba(31,41,55,0.13)] min-[351px]:my-9 min-[351px]:p-[30px_26px] min-[481px]:my-12.5 min-[481px]:w-full min-[481px]:gap-4.5 min-[481px]:p-[36px_32px]"
    >
      <div className="mb-1 text-center min-[481px]:mb-2">
        <p className="m-0 text-2xl font-bold tracking-[-0.5px] text-gray-800 min-[481px]:text-[28px]">
          {isSignUp ? "Create Account" : "Login"}
        </p>
      </div>

      {isSignUp && (
        <div className="flex w-full flex-col gap-2">
          <p className="m-0 text-sm font-semibold text-gray-700">Full Name</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="box-border min-h-11.25 w-full rounded-[9px] border border-gray-300 bg-gray-50 px-3.5 py-3 text-base text-gray-900 outline-none transition-colors duration-200 hover:border-gray-400 focus:border-[#5f6fff] focus:bg-white focus:ring-[3px] focus:ring-[#5f6fff]/13 min-[481px]:min-h-11.5 min-[481px]:text-[15px]"
          />
        </div>
      )}

      <div className="flex w-full flex-col gap-2">
        <p className="m-0 text-sm font-semibold text-gray-700">Email</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="box-border min-h-11.25 w-full rounded-[9px] border border-gray-300 bg-gray-50 px-3.5 py-3 text-base text-gray-900 outline-none transition-colors duration-200 hover:border-gray-400 focus:border-[#5f6fff] focus:bg-white focus:ring-[3px] focus:ring-[#5f6fff]/13 min-[481px]:min-h-11.5 min-[481px]:text-[15px]"
        />
      </div>

      <div className="flex w-full flex-col gap-2">
        <p className="m-0 text-sm font-semibold text-gray-700">Password</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="box-border min-h-11.25 w-full rounded-[9px] border border-gray-300 bg-gray-50 px-3.5 py-3 text-base text-gray-900 outline-none transition-colors duration-200 hover:border-gray-400 focus:border-[#5f6fff] focus:bg-white focus:ring-[3px] focus:ring-[#5f6fff]/13 min-[481px]:min-h-11.5 min-[481px]:text-[15px]"
        />
      </div>

      <button
        type="submit"
        className="mt-1 min-h-11.5 w-full rounded-[9px] bg-[#5f6fff] px-4 py-3.25 text-[15px] font-semibold text-white shadow-[0_5px_12px_rgba(95,111,255,0.2)] transition-all duration-200 hover:-translate-y-px hover:bg-[#4b5be8] hover:shadow-[0_7px_16px_rgba(95,111,255,0.28)] active:translate-y-0 min-[481px]:min-h-12"
      >
        {isSignUp ? "Create Account" : "Login"}
      </button>

      <p className="m-0 text-center text-[13px] leading-[1.7] text-gray-500 min-[481px]:text-sm">
        {isSignUp ? "Already have an account? " : "Create a new account? "}
        <span
          onClick={() => setState(isSignUp ? "Login" : "Sign Up")}
          className="cursor-pointer font-semibold text-[#5f6fff] transition-colors duration-200 hover:text-[#3849d8] hover:underline"
        >
          {isSignUp ? "Login here" : "Click here"}
        </span>
      </p>
    </form>
  );
};

export default Login;
