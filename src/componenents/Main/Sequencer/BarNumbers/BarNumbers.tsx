import { useEffect } from "react";
import "./BarNumbers.scss";
import { useAppSelector } from "../../../../redux/hooks";
import {
  useCreateRefs,
  addResizeEventListeners,
  pixelsPerBar,
  populateCanvas,
} from "../../../../utils/canvas";

export default function BarNumbers() {
  const [canvasRef, parentRef] = useCreateRefs();
  const zoomLevel = useAppSelector((state) => state.zoomLevel.zoomLevel);

  useEffect(function () {
    addResizeEventListeners(canvasRef, parentRef);
  });

  useEffect(
    function () {
      const pixels_per_bar = pixelsPerBar(174, zoomLevel);
    },
    [zoomLevel]
  );

  return (
    <div className="BarNumbers" ref={parentRef}>
      <canvas className="BarNumbers__canvas" ref={canvasRef}></canvas>
    </div>
  );
}
