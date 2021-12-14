import "./TrackLane.scss";
import { useAppSelector } from "../../../../redux/hooks";
import { useCreateRefs, useUseEffect } from "../../../../utils/canvas";
import Waveform from "../Waveform/Waveform";

export default function TrackLane() {
  const [canvasRef, parentRef] = useCreateRefs();
  useUseEffect(canvasRef, parentRef, true);
  const ids = useAppSelector((state) => state.waveformIDs);

  return (
    <div className="TrackLane" ref={parentRef}>
      <canvas className="TrackLane__canvas" ref={canvasRef}></canvas>
      <div className="TrackLane__waveform__container">
        {ids["1"] ? <Waveform id="1" /> : <div></div>}
      </div>
    </div>
  );
}
