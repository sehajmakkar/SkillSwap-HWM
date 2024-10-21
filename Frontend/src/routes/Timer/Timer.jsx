import React, { useState, useEffect } from "react";

const StudyTimer = () => {
  const [time, setTime] = useState(1500); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [cycles, setCycles] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false); // Track music play state
  const audioRef = React.useRef(null); // Reference to the audio element

  // Format time into MM:SS
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  // Timer functionality
  useEffect(() => {
    let interval = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      clearInterval(interval);
      setIsBreak(!isBreak);
      setTime(isBreak ? 1500 : 300); // 25 mins work, 5 mins break
      if (!isBreak) setCycles(cycles + 1);
    }
    return () => clearInterval(interval);
  }, [isActive, time, isBreak]);

  // Start, pause, and reset handlers
  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTime(1500);
    setIsBreak(false);
    setCycles(0);
  };

  // Toggle music play/pause
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-n-7">
      <div className="container">
        {/* Header with Music Button */}
        <div className="flex items-center mb-5">
          <h1 className="h1 text-color-1 flex-grow">{isBreak ? "Break Time!" : "Focus Time!"}</h1>
          <button
            onClick={toggleMusic}
            className="ml-3 px-4 py-2 rounded-lg text-white bg-color-5 hover:bg-color-6 transition-all duration-200 ease-linear"
          >
            {isMusicPlaying ? "Pause Music" : "Play Music"}
          </button>
        </div>

        {/* Timer Display */}
        <div className="bg-n-8 p-8 rounded-lg shadow-lg mb-5 text-center">
          <p className="text-6xl font-bold text-color-2">{formatTime(time)}</p>
        </div>

        {/* Control Buttons */}
        <div className="flex gap-5 mb-5">
          <button
            onClick={toggleTimer}
            className="px-6 py-3 rounded-lg text-white bg-color-1 hover:bg-color-2 transition-all duration-200 ease-linear"
          >
            {isActive ? "Pause" : "Start"}
          </button>
          <button
            onClick={resetTimer}
            className="px-6 py-3 rounded-lg text-white bg-color-3 hover:bg-color-4 transition-all duration-200 ease-linear"
          >
            Reset
          </button>
        </div>

        {/* Pomodoro Cycles */}
        <p className="body-1 text-color-5">{cycles} {cycles === 1 ? "cycle" : "cycles"} completed</p>

        {/* Hidden Audio Element */}
        <audio ref={audioRef} loop>
          <source src="path_to_sample_music.mp3" type="audio/mpeg" />
          {/* Add more sample tracks if needed */}
        </audio>
      </div>
    </div>
  );
};

export default StudyTimer;
