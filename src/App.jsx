import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("work");

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          setIsRunning(false);

          if (mode === "work") {
            setMode("break");
            return 5 * 60;
          } else {
            setMode("work");
            return 25 * 60;
          }
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, mode]);

  const handleClickTrue = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  const handleClickFalse = () => {
    if (isRunning) {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
  };

  const FormatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const displayMinutes = String(minutes).padStart(2, "0");
    const displaySeconds = String(remainingSeconds).padStart(2, "0");
    return `${displayMinutes}:${displaySeconds}`;
  };

  const handleSetWork = () => {
    setIsRunning(false);
    setMode("work");
    setTimeLeft(25 * 60);
  };

  const handleSetBreak = () => {
    setIsRunning(false);
    setMode("break");
    setTimeLeft(5 * 60);
  };

  return (
    <div style={{ position: "relative" }}>
      <div>
        <button className="closeBtn"> Close </button>
      </div>

      <div>
        <button
          className={`WorkBtn ${mode === "work" ? "active" : ""}`}
          onClick={handleSetWork}
        >
          {" "}
          Work{" "}
        </button>
        <button
          className={`BreakBtn ${mode === "break" ? "active" : ""}`}
          onClick={handleSetBreak}
        >
          {" "}
          Break{" "}
        </button>
      </div>

      <div className="TimerDisplay">
        {FormatTime(timeLeft)}
        <button className="StartBtn" onClick={handleClickTrue}>
          {" "}
          Start{" "}
        </button>
        <button className="StopTimer" onClick={handleClickFalse}>
          {" "}
          Stop{" "}
        </button>
        <button className="ResetTimer" onClick={handleReset}>
          {" "}
          Reset{" "}
        </button>
      </div>
    </div>
  );
}

export default App;
