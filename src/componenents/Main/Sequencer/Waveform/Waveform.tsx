import "./Waveform.scss";
import { useCreateRefs } from "../../../../utils/canvas";

export default function Waveform() {
  const [canvasRef, parentRef] = useCreateRefs();

  return (
    <div className="Waveform" ref={parentRef}>
      <canvas className="Waveform__canvas" ref={canvasRef}></canvas>
    </div>
  );
}
