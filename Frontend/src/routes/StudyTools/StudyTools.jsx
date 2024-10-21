import React from "react";
import { useNavigate } from "react-router-dom";

const StudyTools = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      {/* Heading */}
      <h1 className="text-4xl font-semibold text-color-1 mb-8 mt-20">
        Study Tools
      </h1>

      {/* Buttons Grid */}
      <div className="grid grid-cols-2 gap-6 w-full max-w-md">
        <button
          onClick={() => navigate("/whiteboard")}
          className="transition-transform transform hover:scale-105 hover:shadow-lg bg-color-1 text-n-8 p-6 rounded-lg"
        >
          Whiteboard
        </button>
        <button
          onClick={() => navigate("/study-timer")}
          className="transition-transform transform hover:scale-105 hover:shadow-lg bg-color-2 text-n-8 p-6 rounded-lg"
        >
          Study Timer
        </button>
        <button
          onClick={() => navigate("/all-chat")}
          className="transition-transform transform hover:scale-105 hover:shadow-lg bg-color-3 text-n-8 p-6 rounded-lg"
        >
          ALL Chat
        </button>
        <button
          onClick={() => navigate("/group-vcs")}
          className="transition-transform transform hover:scale-105 hover:shadow-lg bg-color-4 text-n-8 p-6 rounded-lg"
        >
          Group VCs
        </button>
      </div>
    </div>
  );
};

export default StudyTools;
