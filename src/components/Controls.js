import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Controls({ videoRef, playVideo, playPauseVideo, progressBar, progressTime, durationTime }) {
  const progressRange = useRef();
  const volumeRange = useRef();
  const volumeBar = useRef();

  const setProgressBar = (e) => {
    const xClick = e.nativeEvent.offsetX;
    const width = progressRange.current.offsetWidth;

    const newTime = xClick / width;
    videoRef.current.currentTime = newTime * videoRef.current.duration;
  };

  const changeVolume = (e) => {
    let volume = e.nativeEvent.offsetX / volumeRange.current.offsetWidth;
    console.log("before =>", volume);

    // if (volume < 0.1) {
    // volume = 0;
    // }
    // if (volume > 0.9) {
    // volume = 1;
    // }

    volumeBar.current.style.width = `${volume * 100}%`;
    // videoRef.current.volume = volume;
    console.log("after =>", volume);
  };

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
              <FontAwesomeIcon icon="volume-up" title="Mute" className=" cursor-pointer" />
              {/* Volume range */}
              <div ref={volumeRange} className=" h-2 w-24 xs:w-16 xs:h-1 bg-gray-300/50 rounded-3xl cursor-pointer">
                <div
                  ref={volumeBar}
                  className=" bg-white  h-full w-full rounded-3xl transition-{width} delay-100 ease-in-out hover:bg-dodgerBlue"
                  onClick={changeVolume}
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
                defaultValue="1.0"
              >
                <option value="0.5">0.5 x</option>
                <option value="0.75">0.75 x</option>
                <option value="1.0">1.0 x</option>
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
            <FontAwesomeIcon icon="expand-alt" className="text-3xl xs:text-xl cursor-pointer hover:text-dodgerBlue" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Controls;
