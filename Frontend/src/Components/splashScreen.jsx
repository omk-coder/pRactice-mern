import React, { useEffect } from "react";

const SplashScreen = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2550);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="flex items-center justify-center w-full h-screen bg-zinc-800">
      <h1 className="text-4xl text-white underline underline-offset-8 ">
        Playaround and move cards for more fun experience (Desktop View Only)
      </h1>
    </div>
  );
};

export default SplashScreen;
