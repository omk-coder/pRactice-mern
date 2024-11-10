import React from 'react'
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import backbtn from "../assets/backbutton.png";

const FeedBackCmp = ({hdlchnage, submitt, loading, error }) => {
    const { currentUser } = useSelector((state) => state.User);
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
   

      <div className="flex justify-center items-center mt-[5%] ">
        <div className="bg-zinc-900 p-8 rounded-lg shadow-lg w-[50%] max-w-md">
          <h2 className="text-5xl text-white mb-6 text-center">Mini Feedback</h2>
          <form onSubmit={submitt}>
          
          <div >
            <input className='mb-3 p-2 rounded-2xl ml-16 text-lg text-center' type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={hdlchnage} />
          </div>
            <div className="mb-4">
              <textarea
                className="w-full h-32 p-4 text-lg text-black bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Provide the Honest Feedback! How does it looks and what changes does it required"
                id="text"
                onChange={hdlchnage}
                required
              />
            </div>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <button
              className="w-full py-3 text-2xl text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              type="submit"
              disabled={loading}
            >
              {loading ? "Submiting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FeedBackCmp