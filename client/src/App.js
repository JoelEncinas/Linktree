import React from "react";
import { useState, useEffect } from "react";

const API_BASE = "http://localhost:5000";

function App() {
  // songs
  const [songs, setSongs] = useState([]);

  // currentSong
  const [audio] = useState(new Audio("/songs/Requiem.mp3"));
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    getSongs();
  }, []);

  const getSongs = () => {
    fetch(API_BASE + "/songs", {
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setSongs(data))
      .catch((err) => console.error("Error: ", err));
  };

  useEffect(() => {
    isPlaying ? audio.play() : audio.pause();
  }, [isPlaying, audio]);

  useEffect(() => {
    const updateProgress = () => {
      const duration = audio.duration || 0;
      const currentTime = audio.currentTime || 0;
      setProgress((currentTime / duration) * 100);
    };

    audio.addEventListener("timeupdate", updateProgress);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, [audio]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e) => {
    const { duration } = audio;
    const clickPosition = e.nativeEvent.offsetX;
    const barWidth = e.target.offsetWidth;
    const newTime = (clickPosition / barWidth) * duration;
    audio.currentTime = newTime;
  };

  return (
    <div className="App">
      <h1>Drill beatz</h1>
      
      <div>
        <h1>My Audio Player</h1>
        <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
        <div
          style={{ background: "gray", height: "5px" }}
          onClick={handleProgressClick}
        >
          <div
            style={{ background: "red", height: "5px", width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
