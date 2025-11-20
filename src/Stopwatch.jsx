import React, { useEffect, useRef, useState } from "react";
import styles from "./Stopwatch.module.css";

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    } else {
      clearInterval(intervalIdRef.current);
    }

    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [isRunning]);

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      startTimeRef.current = Date.now() - elapsedTime;
    }
  };

  const stop = () => setIsRunning(false);

  const reset = () => {
    setElapsedTime(0);
    setIsRunning(false);
    setLaps([]);
  };

  const addLap = () => {
    if (elapsedTime > 0) {
      setLaps((prevLaps) => [...prevLaps, elapsedTime]);
    }
  };

  const formatTime = (time) => {
    const totalTime = time ?? elapsedTime;
    let hours = Math.floor(totalTime / (1000 * 60 * 60));

    let minutes = Math.floor((totalTime / (1000 * 60)) % 60);
    let seconds = Math.floor((totalTime / 1000) % 60);

    let milliseconds = Math.floor((totalTime % 1000) / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-pink-300">
      <div className="border-5 p-5 md:p-15 rounded-full bg-white">
        <div className="text-4xl md:text-7xl font-bold text-center">
          {formatTime()}
        </div>
        <div className="flex gap-3 md:gap-10 mt-5 md:mt-10">
          <button
            className="text-lg md:text-2xl font-bold rounded-full bg-green-300 px-2 md:px-6 py-2 md:py-3 cursor-pointer"
            onClick={start}
          >
            Start
          </button>
          <button
            className="text-lg md:text-2xl font-bold rounded-full bg-red-300 px-2 md:px-6 py-2 md:py-3 cursor-pointer"
            onClick={stop}
          >
            Stop
          </button>
          <button
            className="text-lg md:text-2xl font-bold rounded-full bg-blue-300 px-2 md:px-6 py-2 md:py-3 cursor-pointer"
            onClick={reset}
          >
            Reset
          </button>
          <button
            className="text-lg md:text-2xl font-bold rounded-full bg-yellow-300 px-3 md:px-6 py-2 md:py-3 cursor-pointer"
            onClick={addLap}
          >
            Lap
          </button>
        </div>
      </div>

      {laps.length > 0 && (
        <div
          className={`max-h-60 overflow-y-auto bg-white rounded-2xl md:rounded-4xl border-2 md:border-5 mt-5 p-2 md:p-5 ${styles.laps}`}
        >
          <h3 className="font-bold text-center text-2xl md:text-3xl">Laps</h3>
          <ul className="text-2xl text-center space-y-2 md:space-y-5 mt-3">
            {laps.map((lap, index) => (
              <li key={index}>
                <span className="font-bold">Lap {index + 1}:</span>{" "}
                {formatTime(lap)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Stopwatch;
