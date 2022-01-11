import { useEffect, useRef } from "react";
import "./Main.scss";
import "../TrackControl/TrackControl";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addWaveform } from "../../redux/slices/waveformStateSlice";
import { addId } from "../../redux/slices/waveformIdsSlice";
import TrackControl from "../TrackControl/TrackControl";
import BarNumbers from "./Sequencer/BarNumbers/BarNumbers";
import TrackLane from "./Sequencer/TrackLane/TrackLane";
import BarNumbers2 from "./Sequencer/BarNumbers/BarNumbers2";
import { pixelsPerBar } from "../../utils/canvas";
import { setScrollPosition } from "../../redux/slices/scrollPositionSlice";

export default function Main() {
  const dispatch = useAppDispatch();
  const sequencerRef = useRef<HTMLDivElement>(null);
  const { zoomLevel, mouseDown } = useAppSelector((state) => state.zoomLevel);
  const scrollPosition = useAppSelector((state) => state.scrollPosition);
  const pixels_per_bar = pixelsPerBar(174, zoomLevel);

  function handleScroll(): void {
    const sequencer = sequencerRef.current;
    if (sequencer && !mouseDown) {
      const left = (sequencer.scrollLeft - 16) / pixels_per_bar;
      const right =
        (sequencer.scrollLeft + sequencer.offsetWidth) / pixels_per_bar;
      console.log(left);
      dispatch(setScrollPosition({ left, right }));
    }
  }

  useEffect(
    function () {
      const sequencer = sequencerRef.current;
      if (sequencer) {
        sequencer.scrollLeft = scrollPosition.left * pixels_per_bar + 16;
      }
    },
    [zoomLevel]
  );

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
      <div className="sequencer" ref={sequencerRef} onScroll={handleScroll}>
        <div></div>
        <div>
          <BarNumbers />
          {/* <BarNumbers2 /> */}
          <div className="track-container" id="track-1">
            <TrackLane></TrackLane>
          </div>
        </div>
      </div>
    </div>
  );
}
