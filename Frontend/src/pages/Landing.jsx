import React from "react";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className=" h-screen ">
      <Navbar />
      <div className="flex flex-col items-center justify-center h-5/6 ml-5 mr-5 md:ml-0 md:mr-0">
        <h1 className="text-5xl font-semibold text-white ">
          Welcome, To Traco
        </h1>
        <h3 className="text-lg font-normal text-slate-100 mt-5">
        Traco. A Way To Justify Your Productivity With Minimalistic Interface And Discover the Hidden Features 
        </h3>
        <div className="flex items-center gap-5">
          <Link to="/sign-up" className="mt-10">
            <button className="bg-orange-400 text-white hover:bg-red-600 px-3 py-2 text-lg font-bold rounded-2xl">
              Register
            </button>
          </Link>
          <Link to="/sign-in " className="mt-10">
            <button className="bg-orange-400 text-white hover:bg-red-600 px-4 py-2 text-lg font-bold rounded-2xl">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
