import { useEffect } from "react";
import "./BarNumbers.scss";
import {
  useCreateRefs,
  addResizeEventListeners,
} from "../../../../utils/canvas";

export default function BarNumbers() {
  const [canvasRef, parentRef] = useCreateRefs();

  useEffect(function () {
    addResizeEventListeners(canvasRef, parentRef);
  });

  return (
    <div className="BarNumbers" ref={parentRef}>
      <canvas className="BarNumbers__canvas" ref={canvasRef}></canvas>
    </div>
  );
}
