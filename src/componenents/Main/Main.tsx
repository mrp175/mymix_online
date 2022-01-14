import { useEffect, useRef, useState } from "react";
import "./Main.scss";
import "../TrackControl/TrackControl";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addWaveform } from "../../redux/slices/waveformStateSlice";
import { addId } from "../../redux/slices/waveformIdsSlice";
import TrackControl from "../TrackControl/TrackControl";
import BarNumbersAndLines from "./Sequencer/BarNumbersAndLines/BarNumbersAndLines";
import { drawBarNumbers } from "../../utils/canvas";
import TrackLane from "./Sequencer/TrackLane/TrackLane";
import { pixelsPerBar } from "../../utils/canvas";
import { setScrollPosition } from "../../redux/slices/scrollPositionSlice";

export default function Main() {
  const [state, setState] = useState("");
  const dispatch = useAppDispatch();
  const sequencerRef = useRef<HTMLDivElement>(null);
  const { zoomLevel, mouseDown } = useAppSelector((state) => state.zoomLevel);
  const scrollPosition = useAppSelector((state) => state.scrollPosition);
  const pixels_per_bar = pixelsPerBar(174, zoomLevel);

  function handleScroll(): void {
    const sequencer = sequencerRef.current;
    setState("re-redener");
    if (sequencer && !mouseDown) {
      const barsLeft = (sequencer.scrollLeft - 16) / pixels_per_bar;
      const barsRight =
        (sequencer.scrollLeft + sequencer.offsetWidth - 16) / pixels_per_bar;
      const pxLeft = sequencer.scrollLeft;
      const pxRight = pxLeft + sequencer.offsetWidth;
      dispatch(setScrollPosition({ barsLeft, barsRight, pxLeft, pxRight }));
    }
  }

  useEffect(
    function () {
      const sequencer = sequencerRef.current;
      if (sequencer) {
        let pxLeft = scrollPosition.barsLeft * pixels_per_bar + 16;
        if (scrollPosition.barsLeft < 0) {
          pxLeft = scrollPosition.pxLeft;
        }
        sequencer.scrollLeft = pxLeft;
        const newScrollState = { ...scrollPosition };
        newScrollState.pxLeft = pxLeft;
        newScrollState.pxRight = pxLeft + sequencer.offsetWidth;
        dispatch(setScrollPosition(newScrollState));
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
          <BarNumbersAndLines
            drawToCanvas={drawBarNumbers}
            canvasClassName="BarNumbers__canvas"
            componentClassName="BarNumbers"
          />
          <div className="track-container" id="track-1">
            <TrackLane></TrackLane>
          </div>
        </div>
      </div>
    </div>
  );
}
