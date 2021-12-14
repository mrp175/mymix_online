import { useEffect } from "react";
import "./Main.scss";
import "../TrackControl/TrackControl";
import { useAppDispatch } from "../../redux/hooks";
import {
  setPosition,
  addWaveform,
} from "../../redux/slices/waveformStateSlice";
import { addId } from "../../redux/slices/waveformIDsSlice";
import TrackControl from "../TrackControl/TrackControl";
import BarNumbers from "./Sequencer/BarNumbers/BarNumbers";
import TrackLane from "./Sequencer/TrackLane/TrackLane";

export default function Main() {
  const dispatch = useAppDispatch();

  useEffect(function () {
    dispatch(
      addWaveform({
        id: "1",
        startPosition: 0,
      })
    );

    dispatch(
      addId({
        id: "1",
      })
    );
  }, []);

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
            onChange={(e) =>
              dispatch(setPosition({ id: "1", value: +e.target.value }))
            }
          ></input>
        </div>
      </div>
    </div>
  );
}
