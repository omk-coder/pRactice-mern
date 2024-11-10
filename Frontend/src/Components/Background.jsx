import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logoDet from "../assets/LogoDetails.png";

import { signOutUser } from "../redux/user/UserSlice";

const Background = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.User);
  const serverUrl = import.meta.env.VITE_SERVER_URL;

  const handleSignout = async () => {
    try {
      await axios.post(`${serverUrl}/api/auth/signout`);
      dispatch(signOutUser());
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <div>
        {currentUser ? (
          <div className="">
            <div className=" w-full py-10 flex justify-center text-zinc-500 font-semibold text-lg absolute mt-7 gap-2 ">
              Create Your Mini Notes:<span className="text-red-400 underline underline-offset-4">-- {currentUser.username} --</span>
            </div>
            <div className="flex justify-start gap-5 cursor-pointer">
              <Link to="/create">
                <button className="text-lg text-white bg-orange-300 rounded-md px-2 py-1 cursor-pointer">
                  Create
                </button>
              </Link>

              <button
                className="text-lg text-white bg-orange-300 rounded-md p-1 cursor-pointer"
                onClick={handleSignout}
              >
                Sign out
              </button>
              <Link to="/feedback">
                <button className="text-lg text-white bg-orange-300 rounded-md px-2 py-1 cursor-pointer">
                  Feedback
                </button>
              </Link>

            </div>
          </div>
        ) : (
          <div>
            <Link to="/sign-in">
              <button className="text-2xl text-white bg-orange-300 rounded-md p-2 ">
                Sign in
              </button>
            </Link>
          </div>
        )}
      </div>

      <h1 className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] text-[8vw] leading-none tracking-tighter font-semibold text-zinc-400">
        Traco.
      </h1>
      <div className="mt-[99%]">
        <img className="w-[300px] " src={logoDet} alt="" />
      </div>
    </div>
  );
};

export default Background;
