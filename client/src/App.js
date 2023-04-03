import React from "react";
import { useState, useEffect } from "react";
import ReactAudioPlayer from "react-audio-player";

const API_BASE = "http://localhost:5000";

function App() {
  // songs
  const [songs, setSongs] = useState([]);

  // currentSong
  const [audio] = useState("/songs/Requiem.mp3");

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

  return (
    <div className="App">
      <h1>Drill beatz</h1>
      <h2>Songs</h2>
      <div className="songs" key="song-list">
        {songs.length > 0 ? (
          songs.map((song) => <p key={song.id}>{song.title}</p>)
        ) : (
          <p key="no-songs-message">No songs available</p>
        )}
      </div>

      <ReactAudioPlayer src={audio} autoPlay controls />
    </div>
  );
}

export default App;
