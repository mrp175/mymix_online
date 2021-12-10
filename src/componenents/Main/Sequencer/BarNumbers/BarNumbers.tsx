import "./BarNumbers.scss";
import { useCreateRefs, useUseEffect } from "../../../../utils/canvas";

export default function BarNumbers() {
  const [canvasRef, parentRef] = useCreateRefs();
  useUseEffect(canvasRef, parentRef);

  return (
    <div className="BarNumbers" ref={parentRef}>
      <canvas className="BarNumbers__canvas" ref={canvasRef}></canvas>
    </div>
  );
}
