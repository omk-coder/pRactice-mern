import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { toast } from "react-toastify";
import FeedBackCmp from "../Components/FeedBackCmp";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const FeedBackPg = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const token = JSON.parse(localStorage.getItem("dtl")).token;
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        `${serverUrl}/docs/v2/feedback`,
         formData ,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );
      toast.success("Submitted Successfully");
      navigate("/home");
    } catch (error) {
        setLoading(false);
      toast.error("Error, Try again");
    }
  };

  return (
    <div>
      <FeedBackCmp hdlchnage={handleChange} submitt={handleSubmit} loading={loading} error={error} />
    </div>
  );
};

export default FeedBackPg;
