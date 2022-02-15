import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Controls({ videoRef, playVideo, playPauseVideo, progressBar, progressTime, durationTime, player }) {
  const [mute, setMute] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [lastVolume, setLastVolume] = useState(1);
  const progressRange = useRef();
  const volumeRange = useRef();
  const volumeBar = useRef();

  console.log(fullscreen);

  const toggleMute = () => {
    setMute(!mute);
  };

  const toggleFullscreen = () => {
    const app = player.current;
    if (!fullscreen) {
      openFullscreen(app);
    } else {
      closeFullscreen(app);
    }
    setFullscreen(!fullscreen);
  };

  const setProgressBar = (e) => {
    const xClick = e.nativeEvent.offsetX;
    const width = progressRange.current.offsetWidth;

    const newTime = xClick / width;
    videoRef.current.currentTime = newTime * videoRef.current.duration;
  };

  const changeVolume = (e) => {
    let volume = e.nativeEvent.offsetX / volumeRange.current.offsetWidth;

    if (volume < 0.1) {
      volume = 0;
      setMute(true);
    } else {
      setMute(false);
    }
    if (volume > 0.9) {
      volume = 1;
    }

    volumeBar.current.style.width = `${volume * 100}%`;
    videoRef.current.volume = volume;

    setLastVolume(volume);
  };

  const muteUnmuteVideo = () => {
    if (mute) {
      volumeBar.current.style.width = `${lastVolume * 100}%`;
      videoRef.current.volume = lastVolume;

      toggleMute();
    } else {
      videoRef.current.volume = 0;
      volumeBar.current.style.width = 0;
      toggleMute();
    }
  };

  const changeSpeed = (e) => {
    videoRef.current.playbackRate = e.target.value;
  };

  /* View in fullscreen */
  const openFullscreen = (elem) => {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
    videoRef.current.classList.add("video-fullscreen");
  };

  /* Close fullscreen */
  const closeFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE11 */
      document.msExitFullscreen();
    }
    videoRef.current.classList.remove("video-fullscreen");
  };

  const updateFullscreenState = () => {
    if (
      document.fullscreenElement /* Standard syntax */ ||
      document.webkitFullscreenElement /* Safari and Opera syntax */ ||
      document.msFullscreenElement /* IE11 syntax */
    ) {
      setFullscreen(true);
      videoRef.current.classList.add("video-fullscreen");
    } else {
      setFullscreen(false);
      videoRef.current.classList.remove("video-fullscreen");
    }
  };

  useEffect(() => {
    document.addEventListener("fullscreenchange", updateFullscreenState);
  });

  return (
    <div className="absolute bottom-0 cursor-default z-20 w-full h-1/3 text-white text-4xl xs:text-xl select-none show-controls">
      {/* Controls container */}
      <div className="absolute -bottom-1.5 w-full h-24 xs:h-12 -mt-24 bg-black/50 box-border z-50 flex items-start justify-between rounded-bl-2xl rounded-br-2xl controls-container">
        {/* Progress range */}
        <div
          className="m-auto h-2 progress-range bg-gray-400/50 rounded-3xl absolute left-4 top-4 cursor-pointer"
          title="seek"
          ref={progressRange}
          onClick={setProgressBar}
        >
          {/* Progress bar */}
          <div className=" bg-dodgerBlue h-full rounded-3xl transition-all ease-linear" ref={progressBar}></div>
        </div>
        <div className="flex justify-between w-full h-full xs:relative -top-6">
          {/* Left controls */}
          <div className="left-control ml-4 justify-start">
            <FontAwesomeIcon
              icon={playVideo ? "pause" : "play"}
              title={playVideo ? "Pause" : "play"}
              onClick={playPauseVideo}
              className=" cursor-pointer hover:text-dodgerBlue"
            />
            {/* Volume */}
            <div className="flex gap-4 xs:gap-2  items-center absolute top-0 left-11 xs:left-6">
              <FontAwesomeIcon
                icon={mute ? "volume-mute" : "volume-up"}
                title={mute ? "Unmute" : "Mute"}
                className=" cursor-pointer hover:text-dodgerBlue"
                onClick={muteUnmuteVideo}
              />
              {/* Volume range */}
              <div
                ref={volumeRange}
                className=" h-2 w-24 xs:w-16 xs:h-1 bg-gray-300/50 rounded-3xl cursor-pointer"
                onClick={changeVolume}
              >
                <div
                  ref={volumeBar}
                  className=" bg-white  h-full w-full rounded-3xl transition-{width} delay-100 ease-in-out hover:bg-dodgerBlue"
                ></div>
              </div>
            </div>
          </div>
          {/* Right controls */}
          <div className="right-control mr-4 justify-end">
            {/* Speed */}
            <div title="Playback Rate" className="relative top-2.5">
              <select
                name="playbackRate"
                className="text-2xl xs:text-xs mr-4 rounded-lg absolute -top-2.5 right-2 bg-inherit"
                defaultValue="1"
                onChange={changeSpeed}
              >
                <option value="0.5">0.5 x</option>
                <option value="0.75">0.75 x</option>
                <option value="1">1.0 x</option>
                <option value="1.5">1.5 x</option>
                <option value="2">2.0 x</option>
              </select>
            </div>
            {/* time */}
            <div className="text-2xl xs:text-xs font-bold mr-3">
              <span>{progressTime} /</span>
              <span>{durationTime}</span>
            </div>
            {/* Screen resolution */}
            <FontAwesomeIcon
              icon={fullscreen ? "compress-alt" : "expand-alt"}
              title={fullscreen ? "" : "Fullscreen"}
              className="text-3xl xs:text-xl cursor-pointer hover:text-dodgerBlue"
              onClick={toggleFullscreen}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Controls;
