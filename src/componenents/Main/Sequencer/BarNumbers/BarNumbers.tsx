import { useEffect, useRef, useState } from "react";
import "./BarNumbers.scss";
import { useAppSelector } from "../../../../redux/hooks";
import {
  lineWidth,
  font,
  strokeStyle,
  fillStyle,
  applyCtxProperties,
  createCanvases,
  CanvasRefObj,
  calculateSequencerLengthPx,
  populateCanvasBarNumbers,
} from "../../../../utils/canvas";

export default function BarNumbers() {
  const [canvases, setCanvases] = useState<JSX.Element[]>([]);
  const parentRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const zoomLevel = useAppSelector((state) => state.zoomLevel.zoomLevel);
  const sequencerLengthBars = useAppSelector(
    (state) => state.sequencerLength.length
  );
  const sequencerLengthPx = calculateSequencerLengthPx(
    sequencerLengthBars,
    174,
    zoomLevel
  );

  const canvasRefObj = useRef<CanvasRefObj>({});

  // const canvases = createCanvases(canvasRef, calcular);
  useEffect(function () {
    setCanvases(createCanvases(canvasRefObj, sequencerLengthPx));
  }, []);

  useEffect(function () {
    const parent = parentRef.current!;
    const canvas = canvasRef.current!;
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
    const ctx = canvas.getContext("2d")!;
    applyCtxProperties(ctx, { font, lineWidth, strokeStyle, fillStyle });
    populateCanvasBarNumbers(canvas, zoomLevel);
  }, []);

  useEffect(
    function () {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d")!;

      populateCanvasBarNumbers(canvas, zoomLevel);
    },
    [zoomLevel]
  );

  return (
    <div className="BarNumbers" ref={parentRef}>
      <canvas className="BarNumbers__canvas" ref={canvasRef}></canvas>
    </div>
  );
}
