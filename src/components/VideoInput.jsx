import React from "react";
// import VideoThumbnail from 'react-video-thumbnail';

export default function VideoInput(props) { 
  const {setVideo, setCourseThumbUrl }= props
  const inputRef = React.useRef();

  const [source, setSource] = React.useState();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setVideo(file)
    const url = URL.createObjectURL(file);
    setSource(url);
  };

  const handleChoose = (event) => {
    inputRef.current.click();
  };

  return (
    <div className="VideoInput">
      <input
        style={{marginBottom: 18}}
        ref={inputRef}
        className="VideoInput_input"
        type="file"
        onChange={handleFileChange}
        accept=".mov,.mp4"
      />
      {!source && <button onClick={handleChoose}>Choose video </button>}
      {source && (
        <video
          className="VideoInput_video"
          width="100%"
          style={{aspectRatio: 16 / 9}}
          controls
          src={source}
          autoPlay
          loop
        />
      )}
      {/* <div className="VideoInput_footer">{source || "Nothing selectd"}</div> */}
    </div>
  );
}
