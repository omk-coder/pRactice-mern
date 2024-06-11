import React, { useState, useEffect, useRef } from "react";
import Background from "../Components/Background";
import Cards from "../Components/Cards";

import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [data1, setData1] = useState([]);

  const { currentUser } = useSelector((state) => state.User);
  const token = JSON.parse(localStorage.getItem("dtl"))?.token;
  const constraintsRef = useRef(null);
  const serverUrl = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    const getAllDocs = async () => {
      if (!currentUser || !token) return;

      try {
        const res = await axios.get(`${serverUrl}/docs/show`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData1(res.data);
        console.log(res.data);
      } catch (error) {
        console.log({ error: error.message });
      }
    };

    getAllDocs();
  }, [currentUser, token]);

  const updateDoc = async (id, text) => {
    try {
      const response = await axios.put(
        `${serverUrl}/docs/update/${id}`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData1((prevData) =>
        prevData.map((item) =>
          item._id === id
            ? { ...item, text, updatedAt: response.data.updatedAt }
            : item
        )
      );
      toast.success("Updated Successfully");
      console.log("Document updated:", response.data);
    } catch (error) {
      toast.error("Try again");
      console.error("Error updating document:", error);
    }
  };

  const DeleteDocs = async (id) => {
    try {
      await axios.delete(`${serverUrl}/docs/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData1((prevData) => prevData.filter((items) => items._id !== id));
      toast.success("Deleted Successfully");
      console.log("Document deleted successfully");
    } catch (error) {
      toast.error("Try again not deleted");
      console.error("Error deleting document:", error);
    }
  };

  return (
    <div>
      <div className="w-screen h-screen" ref={constraintsRef}>
        {currentUser ? (
          <div className="fixed top-0 left-0 z-[3] h-full w-full flex gap-10 flex-wrap p-5 mx-auto">
            
            <Background />
            
            
            {data1.map((item) => (
              <Cards
                key={item._id}
                item={item}
                onDelete={DeleteDocs}
                onUpdate={updateDoc}
                dragInIt={constraintsRef}
              />
            ))}
          </div>
        ) : (
          "user not found"
        )}
      </div>
    </div>
  );
};

export default Home;