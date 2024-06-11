import React, { useEffect, useState, useRef } from "react";
import lock from "../assets/lock.png";
import open from "../assets/create.png";
import create from "../assets/open.png";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import complete from "../assets/complete.png";

const Cards = ({ item, onDelete, onUpdate,  dragInIt}) => {
  const [text, setText] = useState(item.text);
  const [Enabled, setEnabled] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [completed, setCompleted] = useState(false);


  const handleConfetti = () => {
    setCompleted((prev) => !prev);

    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const HandleUpdate = async (e) => {
    e.preventDefault();
    onUpdate(item._id, text);
  };

  const handleDelete = async () => {
    onDelete(item._id);
  };

  return (
    <motion.div  
      drag
      dragConstraints={dragInIt}
      whileDrag={{ scale: 1.1 }}
     
    >
      {showConfetti && (
        <Confetti
          width={177}
          height={170}
          numberOfPieces={200}
          gravity={0.5}
          recycle={false}
        />
      )}
      <div className="relative w-[189px]  rounded-[40px] bg-zinc-900/90 text-white   overflow-hidden">
        <div className="flex justify-between mt-4">
          <div>
            <img
              className="w-4 ml-3 bg-white rounded-3xl p-1"
              src={create}
              alt=""
            />
          </div>
          <div className="flex gap-2 mr-3">
            <button onClick={() => setEnabled(!Enabled)} className="w-4">
              <img src={Enabled ? lock : open} alt="Toggle Edit" />
            </button>
            <button onClick={HandleUpdate} className="w-4">
              <img src={create} alt="Update" />
            </button>
            <button onClick={handleDelete} className="w-4">
              <img src={lock} alt="Delete" />
            </button>
          </div>
        </div>

        <textarea
          disabled={Enabled}
          value={text}
          onChange={handleChange}
          className="mt-1 h-32 w-[180px] text-base p-1 bg-zinc-900/90 ml-1 resize-none scrollbar-hide"
        ></textarea>
        <footer>
        <div className="  bottom-0  w-full left-0  ">
          <div className="tag w-full py-2 bg-green-600 flex items-center justify-center gap-2">
            <button className="text-sm font-semibold " onClick={handleConfetti}>
              {completed ? "Completed" : "Not yet Complete"}{" "}
            </button>
            <img className="w-6 bg-white rounded-3xl" src={complete} alt="" />
          </div>
        </div>
        </footer>
      </div>

      <div>
        <span className="text-white ml-9 text-xs">
          {new Date(item.updatedAt).toLocaleString()}
        </span>
      </div>
    </motion.div>
  );
};

export default Cards;

  // const cardRef = useRef(null);
  // const [dragConstraints, setDragConstraints] = useState({});

  // useEffect(() => {
  //   const updateDragConstraints = () => {
  //     const container = cardRef.current.parentNode;
  //     const containerRect = container.getBoundingClientRect();
  //     const cardRect = cardRef.current.getBoundingClientRect();

  //     setDragConstraints({
  //       left: -(cardRect.left - containerRect.left),
  //       right: containerRect.right - cardRect.right,
  //       top: -(cardRect.top - containerRect.top),
  //       bottom: containerRect.bottom - cardRect.bottom,
  //     });
  //   };

  //   updateDragConstraints();
  //   window.addEventListener("resize", updateDragConstraints);

  //   return () => {
  //     window.removeEventListener("resize", updateDragConstraints);
  //   };
  // }, []);