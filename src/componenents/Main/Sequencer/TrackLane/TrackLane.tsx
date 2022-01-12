import { useEffect, useRef } from "react";
import "./TrackLane.scss";
import { useAppSelector } from "../../../../redux/hooks";
import BarNumbersAndLines from "../BarNumbersAndLines/BarNumbersAndLines";
import {
  pixelsPerBar,
  drawLine,
  lineWidth,
  minimumLineSpacing,
  strokeStyle,
  applyCtxProperties,
  setPixelsPerLine,
  calculateSequencerLengthPx,
  drawBarLines,
} from "../../../../utils/canvas";
import Waveform from "../../../Waveform/Waveform";

export default function TrackLane() {
  const componentRef = useRef<HTMLDivElement>(null);
  const ids = useAppSelector((state) => state.waveformIds);
  const zoomLevel = useAppSelector((state) => state.zoomLevel.zoomLevel);
  const sequencerLengthBars = useAppSelector(
    (state) => state.sequencerLength.length
  );

  useEffect(
    function () {
      const sequencerLengthPx = calculateSequencerLengthPx(
        sequencerLengthBars,
        174,
        zoomLevel
      );
      const component = componentRef.current;
      if (component) {
        component.style.width = sequencerLengthPx + "px";
      }
    },
    [zoomLevel, sequencerLengthBars]
  );

  return (
    <div className="TrackLane" ref={componentRef}>
      <BarNumbersAndLines
        callback={drawBarLines}
        canvasClassName="bar-lines__canvas"
        componentClassName="bar-lines"
      />
      <div className="TrackLane__waveform__container">
        {ids["1"] ? <Waveform id="1" /> : <div></div>}
      </div>
    </div>
  );
}
