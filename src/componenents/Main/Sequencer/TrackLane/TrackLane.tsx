import { useEffect } from "react";
import "./TrackLane.scss";
import { useAppSelector } from "../../../../redux/hooks";
import {
  useCreateRefs,
  pixelsPerBar,
  drawLine,
  drawText,
  lineWidth,
  minimumLineSpacing,
  font,
  strokeStyle,
  fillStyle,
  applyCtxProperties,
  setPixelsPerLine,
} from "../../../../utils/canvas";
import Waveform from "../../../Waveform/Waveform";

export default function TrackLane() {
  const [canvasRef, parentRef] = useCreateRefs();
  const ids = useAppSelector((state) => state.waveformIds);
  const zoomLevel = useAppSelector((state) => state.zoomLevel.zoomLevel);

  return (
    <div className="TrackLane" ref={parentRef}>
      <canvas className="TrackLane__canvas" ref={canvasRef}></canvas>
      <div className="TrackLane__waveform__container">
        {ids["1"] ? <Waveform id="1" /> : <div></div>}
      </div>
    </div>
  );
}
