import { useEffect } from "react";
import "./BarNumbers.scss";
import { useAppSelector } from "../../../../redux/hooks";
import {
  useCreateRefs,
  pixelsPerBar,
  drawLine,
  drawText,
  lineWidth,
  font,
  strokeStyle,
  fillStyle,
  applyCtxProperties,
} from "../../../../utils/canvas";

export default function BarNumbers() {
  const [canvasRef, parentRef] = useCreateRefs();
  const zoomLevel = useAppSelector((state) => state.zoomLevel.zoomLevel);

  function populateCanvas(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    zoomLevel: number
  ): void {
    const pixels_per_bar = pixelsPerBar(174, zoomLevel);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let count = 1;
    ctx.beginPath();
    for (let i = 0; i < canvas.width; i += pixels_per_bar) {
      drawLine(ctx, i, canvas.height);
      drawText(ctx, i + 5, canvas.height / 2, count + "");
      count += 1;
    }

    ctx.stroke();
  }

  useEffect(function () {
    const parent = parentRef.current!;
    const canvas = canvasRef.current!;
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
    const ctx = canvas.getContext("2d")!;
    applyCtxProperties(ctx, { font, lineWidth, strokeStyle, fillStyle });
    populateCanvas(canvas, ctx, zoomLevel);
    // addResizeEventListeners(canvasRef, parentRef);
  }, []);

  useEffect(
    function () {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d")!;

      populateCanvas(canvas, ctx, zoomLevel);
    },
    [zoomLevel]
  );

  // useEffect(
  //   function () {
  //     const canvas = canvasRef.current!
  //     const parent = parentRef.current!;
  //     const ctx = canvas.getContext('2d');
  //     const pixels_per_bar = pixelsPerBar(174, zoomLevel);

  //   },
  //   [zoomLevel]
  // );

  return (
    <div className="BarNumbers" ref={parentRef}>
      <canvas className="BarNumbers__canvas" ref={canvasRef}></canvas>
    </div>
  );
}
