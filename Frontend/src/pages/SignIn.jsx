import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function SignIn() {
  const [formData, setformData] = useState({email: "", password: ""});

  const { loading} = useSelector((state) => state.User);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const serverUrl = import.meta.env.VITE_SERVER_URL;
 
  const handleChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(signInStart());
    try {
      const res = await axios.post(
        `${serverUrl}/api/auth/signin`,
        formData
      );
      dispatch(signInSuccess(res.data));
      toast.success("Logged In Successfully")
      localStorage.setItem("dtl", JSON.stringify(res.data));
      console.log(res);

      navigate("/home");
    } catch (e) {
      dispatch(signInFailure(e));
      toast.error("Wrong Credentials")
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 justify-center items-center h-[40vw]"
      >
        <h1 className="text-4xl text-white underline decoration-sky-500 font-bold tracking-wider">
          Sign-In
        </h1>
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="text-xl bg-violet-500 p-2 w-2/6 text-white rounded-md"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="text-xl bg-violet-500 p-2 w-2/6 text-white rounded-md"
          onChange={handleChange}
          required
        />
        <button
          disabled={loading}
          className="uppercase bg-orange-300 text-white hover:bg-red-600 px-4 py-2 text-xl rounded-2xl w-2/6"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <h3 className="text-white text-xl gap-1">
          Don't Have an Account?
          <Link
            to="/sign-up"
            className="hover:underline hover:text-red-500 ml-2"
          >
            Signup
          </Link>{" "}
        </h3>
      </form>
     
    </div>
  );
}
