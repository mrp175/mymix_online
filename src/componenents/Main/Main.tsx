import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Main.scss";
import "../TrackControl/TrackControl";
import TrackControl from "../TrackControl/TrackControl";
import BarNumbers from "./Sequencer/BarNumbers/BarNumbers";
import TrackLane from "./Sequencer/TrackLane/TrackLane";
import { goToPosition } from "../../redux/waveformPositionReducer";

export default function Main() {
  const { position } = useSelector((state: any) => state.waveformPosition);
  console.log(position);
  const dispatch = useDispatch();

  // useEffect(
  //   function () {
  //     console.log(position);
  //   },
  //   [position]
  // );

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
          <input
            className="mock-position-slider"
            type="range"
            min="0"
            max="500"
            step="1"
            onChange={(e) => dispatch(goToPosition(e.target.value))}
          ></input>
        </div>
      </div>
    </div>
  );
}
