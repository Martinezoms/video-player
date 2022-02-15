import { useState, useRef } from "react";
import Controls from "./components/Controls";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faS } from "@fortawesome/free-solid-svg-icons";
import {
  faPlay,
  faPause,
  faVolumeUp,
  faVolumeMute,
  faExpandAlt,
  faCompressAlt
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";

library.add(faS, faPause, faPlay, faVolumeUp, faVolumeMute, faExpandAlt, faCompressAlt);

function App() {
  const player = useRef();
  const videoRef = useRef();
  const progressBar = useRef();
  const [playVideo, setplayVideo] = useState(false);
  const [progressTime, setProgressTime] = useState("00:00");
  const [durationTime, setDurationTime] = useState("00:00");

  const togglePlay = () => {
    setplayVideo(!playVideo);
  };

  const playPauseVideo = () => {
    if (playVideo) {
      videoRef.current.pause();
      togglePlay();
    } else {
      videoRef.current.play();
      togglePlay();
    }
  };

  const displayTime = (time) => {
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    seconds = seconds > 9 ? seconds : `0${seconds}`;
    return `${minutes}:${seconds}`;
  };

  const updateProgress = () => {
    const { duration, currentTime } = videoRef.current;
    progressBar.current.style.width = `${(currentTime / duration) * 100}%`;
    setProgressTime(displayTime(currentTime));
    setDurationTime(displayTime(duration));
  };

  return (
    <div className="player" ref={player}>
      <video
        src="https://pixabay.com/videos/download/video-1900_medium.mp4?attachment"
        playsInline
        ref={videoRef}
        className=" rounded-2xl"
        onClick={playPauseVideo}
        onEnded={() => setplayVideo(false)}
        onTimeUpdate={updateProgress}
        onCanPlay={updateProgress}
      ></video>
      <Controls
        player={player}
        videoRef={videoRef}
        progressBar={progressBar}
        playVideo={playVideo}
        playPauseVideo={playPauseVideo}
        progressTime={progressTime}
        durationTime={durationTime}
      />

      {/* <!-- Car Racing (1080P)-->
    <!-- https://pixabay.com/videos/download/video-41758_source.mp4?attachment -->
    <!-- Lake (4K) -->
    <!-- https://pixabay.com/videos/download/video-28745_source.mp4?attachment -->
    <!-- Ocean (720P)-->
    <!-- https://pixabay.com/videos/download/video-31377_tiny.mp4?attachment --> */}
    </div>
  );
}

export default App;
