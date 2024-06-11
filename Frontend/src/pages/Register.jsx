import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUserPending,
  registerUserSuccess,
  registerUserFailure,
} from "../redux/user/UserSlice";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [formData, setformData] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  
  const { loading } = useSelector((state) => state.User);
  const handleChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(registerUserPending());
    try {
      const response = await axios.post(
        `${serverUrl}/api/auth/signup`,
        formData
      );

      dispatch(registerUserSuccess());
      toast.success("New User Registered")

      navigate("/sign-in");
    } catch (error) {
      dispatch(registerUserFailure(error));
      toast.error("Please Fill The Details")
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 justify-center items-center h-[45vw]"
      >
        <h1 className="text-4xl text-white underline decoration-sky-500 font-bold tracking-wider">
          Register
        </h1>
        <input
          type="text"
          id="username"
          placeholder="username"
          className="text-xl bg-violet-500 p-2 w-2/6 text-white rounded-md"
          onChange={handleChange}
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="text-xl bg-violet-500 p-2 w-2/6 text-white rounded-md"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="text-xl bg-violet-500 p-2 w-2/6 text-white rounded-md"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="uppercase bg-orange-300 text-white hover:bg-red-600 px-4 py-2 text-xl rounded-2xl w-2/6"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <h3 className="text-white text-xl gap-1">
          Already Have an account?
          <Link
            to="/sign-in"
            className="hover:underline hover:text-red-500 ml-2"
          >
            Sign-In
          </Link>{" "}
        </h3>
      </form>
    
    </div>
  );
};

export default Register;
