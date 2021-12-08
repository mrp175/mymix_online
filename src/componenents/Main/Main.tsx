import "./Main.scss";
import "../TrackControl/TrackControl";
import TrackControl from "../TrackControl/TrackControl";
import BarNumbers from "./Sequencer/BarNumbers/BarNumbers";

export default function Main() {
  return (
    <div className="Main">
      <div className="sidebar">
        <button className="sidebar__add-track">+ Add Track</button>
        <TrackControl />
      </div>
      <div className="sequencer">
        <BarNumbers />
      </div>
    </div>
  );
}
