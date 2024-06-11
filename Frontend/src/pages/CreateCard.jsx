import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import backbtn from "../assets/backbutton.png";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CreateCard = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // const {currentUser} = useSelector((state) => state.User)
  const navigate = useNavigate();
  const serverUrl = import.meta.env.VITE_SERVER_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const token = JSON.parse(localStorage.getItem("dtl")).token;

    try {
      const response = await axios.post(
        `${serverUrl}/docs/create`,
        { text: text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Created Successfully")
      navigate("/home");
    } catch (error) {
      toast.error("Error, Try again")
      setError("An error occurred while creating the document.");
    } finally {

      setLoading(false);
    }
  };

  return (
    <div>
    <div className="px-4 py-3">
    <Link to="/home">
        <img
          className="bg-white rounded-full w-[35px] ml-2 "
          src={backbtn}
          alt=""
        />
      </Link>
    </div>
   

      <div className="flex justify-center items-center mt-[5%]">
        <div className="bg-zinc-900 p-8 rounded-lg shadow-lg w-[50%] max-w-md">
          <h2 className="text-5xl text-white mb-6 text-center">Create Docs</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <textarea
                className="w-full h-32 p-4 text-lg text-black bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Write down your list or documentation here"
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              />
            </div>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <button
              className="w-full py-3 text-2xl text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              type="submit"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCard;
