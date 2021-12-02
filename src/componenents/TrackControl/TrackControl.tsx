import "./TrackControl.scss";

export default function TarackControl() {
  return (
    <div className="TrackControl">
      <div className="TrackControl__solo-mute">
        <button className="button__mute">M</button>
        <button className="button__solo">S</button>
      </div>
      <div className="TrackControl__controls">
        <div className="track-name-and-volume-slider-container">
          <div className="track-name">Track 1</div>
          <input
            className="slider__volume"
            type="range"
            min="0"
            max="100"
            step="1"
          ></input>
        </div>
        <div className="button__automation__container">
          <button className="button__automation">A</button>
        </div>
      </div>
    </div>
  );
}
