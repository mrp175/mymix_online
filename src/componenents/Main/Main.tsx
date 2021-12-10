import "./Main.scss";
import "../TrackControl/TrackControl";
import TrackControl from "../TrackControl/TrackControl";
import BarNumbers from "./Sequencer/BarNumbers/BarNumbers";
import TrackLane from "./Sequencer/TrackLane/TrackLane";

export default function Main() {
  return (
    <div className="Main">
      <div className="sidebar">
        <button className="sidebar__add-track">+ Add Track</button>
        <TrackControl />
      </div>
      <div className="sequencer">
        <div></div>
        <div>
          <BarNumbers />
          <div className="track-container" id="track-1">
            <TrackLane></TrackLane>
          </div>
        </div>
      </div>
    </div>
  );
}
