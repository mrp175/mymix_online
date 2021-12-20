import { useEffect } from "react";
import "./BarNumbers.scss";
import { useAppSelector } from "../../../../redux/hooks";
import { convertRemToPixels } from "../../../../utils/utils";
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

  function setPixelsPerLine(pixels_per_bar: number): number {
    let pixels_per_line = pixels_per_bar;
    if (pixels_per_line < convertRemToPixels(4)) {
      pixels_per_line *= 2;
      return setPixelsPerLine(pixels_per_line);
    }
    return pixels_per_line;
  }

  function populateCanvas(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    zoomLevel: number
  ): void {
    const pixels_per_bar = pixelsPerBar(174, zoomLevel);
    const pixels_per_line = setPixelsPerLine(pixels_per_bar);
    const barToLineRatio = pixels_per_line / pixels_per_bar;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let count = 1;
    ctx.beginPath();
    for (let i = 0; i < canvas.width; i += pixels_per_line) {
      drawLine(ctx, i, canvas.height);
      drawText(ctx, i + 5, canvas.height / 2, count + "");
      count += barToLineRatio;
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
    <div className="BarNumbers" ref={parentRef}>
      <canvas className="BarNumbers__canvas" ref={canvasRef}></canvas>
    </div>
  );
}
