import "./TrackLane.scss";
import { useCreateRefs, useUseEffect } from "../../../../utils/canvas";
import Waveform from "../Waveform/Waveform";

export default function TrackLane() {
  const [canvasRef, parentRef] = useCreateRefs();
  useUseEffect(canvasRef, parentRef, true);

  return (
    <div className="TrackLane" ref={parentRef}>
      <canvas className="TrackLane__canvas" ref={canvasRef}></canvas>
      <Waveform />
    </div>
  );
}
