import { useState, useEffect } from "react";
import "./App.css";
import notificationSound from "./assets/sounds/notification.wav";

function App() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("work");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          {
            setIsRunning(false);

            if (isSoundOn === true) {
              const audio = new Audio(notificationSound);
              audio.volume = 1.0;
              audio
                .play()
                .catch((error) => console.log("Audio play blocked:", error));
            }
          }

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
  }, [isRunning, mode, isSoundOn]);

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

  const handleCloseApp = () => {
    window.close();
  };

  const handleMinimizeApp = () => {
    if (window.require) {
      const { ipcRenderer } = window.require("electron");
      ipcRenderer.send("minimize-app");
    }
  };

  return (
    <>
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <mask id="stamp-mask" maskUnits="objectBoundingBox">
            <rect width="500" height="700" fill="white" />
            <g fill="black">
              <circle cx="0" cy="0" r="18" />
              <circle cx="45" cy="0" r="18" />
              <circle cx="91" cy="0" r="18" />
              <circle cx="136" cy="0" r="18" />
              <circle cx="182" cy="0" r="18" />
              <circle cx="227" cy="0" r="18" />
              <circle cx="273" cy="0" r="18" />
              <circle cx="318" cy="0" r="18" />
              <circle cx="364" cy="0" r="18" />
              <circle cx="409" cy="0" r="18" />
              <circle cx="455" cy="0" r="18" />
              <circle cx="500" cy="0" r="18" />

              <circle cx="0" cy="700" r="18" />
              <circle cx="45" cy="700" r="18" />
              <circle cx="91" cy="700" r="18" />
              <circle cx="136" cy="700" r="18" />
              <circle cx="182" cy="700" r="18" />
              <circle cx="227" cy="700" r="18" />
              <circle cx="273" cy="700" r="18" />
              <circle cx="318" cy="700" r="18" />
              <circle cx="364" cy="700" r="18" />
              <circle cx="409" cy="700" r="18" />
              <circle cx="455" cy="700" r="18" />
              <circle cx="500" cy="700" r="18" />

              <circle cx="0" cy="0" r="18" />
              <circle cx="0" cy="47" r="18" />
              <circle cx="0" cy="93" r="18" />
              <circle cx="0" cy="140" r="18" />
              <circle cx="0" cy="186" r="18" />
              <circle cx="0" cy="233" r="18" />
              <circle cx="0" cy="280" r="18" />
              <circle cx="0" cy="326" r="18" />
              <circle cx="0" cy="373" r="18" />
              <circle cx="0" cy="420" r="18" />
              <circle cx="0" cy="466" r="18" />
              <circle cx="0" cy="513" r="18" />
              <circle cx="0" cy="560" r="18" />
              <circle cx="0" cy="606" r="18" />
              <circle cx="0" cy="653" r="18" />
              <circle cx="0" cy="700" r="18" />

              <circle cx="500" cy="0" r="18" />
              <circle cx="500" cy="47" r="18" />
              <circle cx="500" cy="93" r="18" />
              <circle cx="500" cy="140" r="18" />
              <circle cx="500" cy="186" r="18" />
              <circle cx="500" cy="233" r="18" />
              <circle cx="500" cy="280" r="18" />
              <circle cx="500" cy="326" r="18" />
              <circle cx="500" cy="373" r="18" />
              <circle cx="500" cy="420" r="18" />
              <circle cx="500" cy="466" r="18" />
              <circle cx="500" cy="513" r="18" />
              <circle cx="500" cy="560" r="18" />
              <circle cx="500" cy="606" r="18" />
              <circle cx="500" cy="653" r="18" />
              <circle cx="500" cy="700" r="18" />
            </g>
          </mask>
        </defs>
      </svg>

      <div
        className="app-layout"
        style={{
          display: "flex",
          position: "relative",
          border: "24px solid #F0DFAD",
          WebkitAppRegion: "drag",
          WebkitMaskImage: "url(#stamp-mask)",
          maskImage: "url(#stamp-mask)",
        }}
      >
        <div style={{ position: "relative" }}>
          <div>
            <button
              className="minimizeBtn"
              onClick={handleMinimizeApp}
              style={{ WebkitAppRegion: "no-drag" }}
            >
              {" "}
              -{" "}
            </button>
            <button
              className="closeBtn"
              onClick={handleCloseApp}
              style={{ WebkitAppRegion: "no-drag" }}
            >
              {" "}
              x{" "}
            </button>
          </div>

          <div>
            <button
              className={`WorkBtn ${mode === "work" ? "active" : ""}`}
              onClick={handleSetWork}
              style={{ WebkitAppRegion: "no-drag" }}
            >
              {" "}
              Work{" "}
            </button>
            <button
              className={`BreakBtn ${mode === "break" ? "active" : ""}`}
              onClick={handleSetBreak}
              style={{ WebkitAppRegion: "no-drag" }}
            >
              {" "}
              Break{" "}
            </button>
          </div>

          <div className="TimerDisplay">
            {FormatTime(timeLeft)}
            <div className="StartStopBtns">
              <button
                className="StartBtn"
                onClick={handleClickTrue}
                style={{ WebkitAppRegion: "no-drag" }}
              >
                {" "}
                Start{" "}
              </button>
              <button
                className="StopBtn"
                onClick={handleClickFalse}
                style={{ WebkitAppRegion: "no-drag" }}
              >
                {" "}
                Stop{" "}
              </button>
            </div>
            <button
              className="ResetTimer"
              onClick={handleReset}
              style={{ WebkitAppRegion: "no-drag" }}
            >
              {" "}
              Reset{" "}
            </button>
          </div>
        </div>
        <button
          className={`SettingsBtn ${isSettingsOpen ? "active" : ""}`}
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          style={{ WebkitAppRegion: "no-drag" }}
        >
          <span className="mdi--gear"></span>
        </button>

        <div
          className={`SettingsPanel ${isSettingsOpen ? "open" : ""}`}
          style={{ WebkitAppRegion: "no-drag" }}
        >
          <h3> Settings</h3>
          <hr className="settings-divider" />

          <div className="settings-content">
            <button
              className={`SoundTogglerBtn ${isSoundOn ? "active" : ""}`}
              onClick={() => setIsSoundOn(!isSoundOn)}
              style={{ WebkitAppRegion: "no-drag" }}
            >
              Sound {isSoundOn ? "ON" : "OFF"}
            </button>
            <p> theme changer </p>
            <p> timer changer</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
