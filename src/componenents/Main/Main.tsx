import "./Main.scss";
import "../TrackControl/TarackControl";
import TarackControl from "../TrackControl/TarackControl";

export default function Main() {
  return (
    <div className="Main">
      <div className="side-bar">
        <TarackControl />
      </div>
      <div className="sequencer"></div>
    </div>
  );
}
