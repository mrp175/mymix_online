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
  minimumLineSpacing,
  font,
  strokeStyle,
  fillStyle,
  applyCtxProperties,
  setPixelsPerLine,
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
    const pixels_per_line = setPixelsPerLine(
      pixels_per_bar,
      minimumLineSpacing
    );
    const barToLineRatio = pixels_per_line / pixels_per_bar;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let count = 1;
    ctx.beginPath();
    for (let i = 0; i < canvas.width; i += pixels_per_line) {
      drawLine(ctx, i, 0, canvas.height);
      drawText(ctx, i + 5, canvas.height / 3, count + "");
      const pixelsPerSubdividingLine = pixels_per_line / 4;
      drawLine(
        ctx,
        i + pixelsPerSubdividingLine,
        canvas.height,
        canvas.height / 1.5
      );
      drawLine(
        ctx,
        i + pixelsPerSubdividingLine * 2,
        canvas.height,
        canvas.height / 1.5
      );
      drawLine(
        ctx,
        i + pixelsPerSubdividingLine * 3,
        canvas.height,
        canvas.height / 1.5
      );
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
