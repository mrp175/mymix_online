import { useRef, useEffect } from "react";
import "./BarNumbers.scss";
import { convertRemToPixels, getVariableStyle } from "../../../../utils/utils";
import { populateCanvas, handleResize } from "../../../../utils/canvas";

export default function BarNumbers() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const remScale = 1;
  const textSize = remScale / 1.45; //this is what it will be in rem.
  const barSpacing = 7; // This should scale with zoom.
  const scale = convertRemToPixels(remScale);
  const font = getVariableStyle("--font-main");

  useEffect(function () {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    handleResize(canvas, ctx, parentRef, barSpacing, scale, textSize);
    window.addEventListener("resize", () =>
      handleResize(canvas, ctx, parentRef, barSpacing, scale, textSize)
    );
    return function () {
      window.removeEventListener("resize", () =>
        handleResize(canvas, ctx, parentRef, barSpacing, scale, textSize)
      );
    };
  }, []);

  return (
    <div className="BarNumbers" ref={parentRef}>
      <canvas className="BarNumbers__canvas" ref={canvasRef}></canvas>
    </div>
  );
}
