import React from "react";
import { useNavigate } from "react-router-dom";

const StudyTools = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] p-8">
      {/* Heading */}
      <h1 className="text-5xl font-semibold text-color-1 mb-12 mt-20 text-center">
        Study Tools
      </h1>

      {/* Buttons Grid */}
      <div className="grid grid-cols-2 gap-10 w-full max-w-2xl">
        <button
          onClick={() => navigate("/whiteboard")}
          className="transition-transform transform hover:scale-105 hover:shadow-lg bg-color-1 text-n-8 p-10 text-xl rounded-lg"
        >
          Whiteboard
        </button>
        <button
          onClick={() => navigate("/timer")}
          className="transition-transform transform hover:scale-105 hover:shadow-lg bg-color-2 text-n-8 p-10 text-xl rounded-lg"
        >
          Study Timer
        </button>
        <button
          onClick={() => navigate("/allchat")}
          className="transition-transform transform hover:scale-105 hover:shadow-lg bg-color-3 text-n-8 p-10 text-xl rounded-lg"
        >
          All Chat
        </button>
        <button
          onClick={() => navigate("/groupvcs")}
          className="transition-transform transform hover:scale-105 hover:shadow-lg bg-color-4 text-n-8 p-10 text-xl rounded-lg"
        >
          Group VCs
        </button>
      </div>
    </div>
  );
};

export default StudyTools;
