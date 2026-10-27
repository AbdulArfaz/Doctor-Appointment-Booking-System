import React, { useContext, useState } from "react";
import "../styles/Login.css";
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
        const { data } = await axios.post(
          `${backendurl}/api/user/register`,
          { name, email, password }
        );

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
        { withCredentials: true}
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

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className="login-title">
        <p>{state === "Sign Up" ? "Create Account" : "Login"}</p>
      </div>

      {state === "Sign Up" && (
        <div className="login-input">
          <p>Full Name</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
      )}

      <div className="login-input">
        <p>Email</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="login-input">
        <p>Password</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit">
        {state === "Sign Up" ? "Create Account" : "Login"}
      </button>

      {state === "Sign Up" ? (
        <p>
          Already have an account?{" "}
          <span onClick={() => setState("Login")}>Login here</span>
        </p>
      ) : (
        <p>
          Create a new account?{" "}
          <span onClick={() => setState("Sign Up")}>Click here</span>
        </p>
      )}
    </form>
  );
};

export default Login;