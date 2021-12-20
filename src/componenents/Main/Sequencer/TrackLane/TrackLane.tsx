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

  function populateCanvas(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    zoomLevel: number
  ): void {
    const pixels_per_bar = pixelsPerBar(174, zoomLevel);
    const pixels_per_line = setPixelsPerLine(
      pixels_per_bar,
      minimumLineSpacing
    );
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    for (let i = 0; i < canvas.width; i += pixels_per_line / 4) {
      drawLine(ctx, i + 0.5, 0, canvas.height);
    }
    ctx.stroke();
  }

  useEffect(function () {
    const parent = parentRef.current!;
    const canvas = canvasRef.current!;
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
    const ctx = canvas.getContext("2d")!;
    applyCtxProperties(ctx, { lineWidth, strokeStyle });
    populateCanvas(canvas, ctx, zoomLevel);
  }, []);

  useEffect(
    function () {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d")!;
      populateCanvas(canvas, ctx, zoomLevel);
    },
    [zoomLevel]
  );

  return (
    <div className="TrackLane" ref={parentRef}>
      <canvas className="TrackLane__canvas" ref={canvasRef}></canvas>
      <div className="TrackLane__waveform__container">
        {ids["1"] ? <Waveform id="1" /> : <div></div>}
      </div>
    </div>
  );
}
