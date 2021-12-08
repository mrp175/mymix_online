import { useRef, useEffect } from "react";
import "./BarNumbers.scss";
import { convertRemToPixels } from "../../../../utils/utils";
import { getVariableStyle } from "../../../../utils/utils";

export default function BarNumbers() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const parentRef = useRef<HTMLDivElement | null>(null);
  const remScale = 1;
  const textSize = remScale / 1.45; //this is what it will be in rem.
  const barSpacing = 7; // This should scale with zoom.
  const scale = convertRemToPixels(remScale);
  const font = getVariableStyle("--font-main");
  console.log("style", getVariableStyle("--dark-alt"));

  function handleResize(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ): void {
    canvas.width = 0 as number;
    canvas.height = 0 as number;
    canvas.width = parentRef.current?.offsetWidth as number;
    canvas.height = parentRef.current?.offsetHeight as number;
    populateCanvas(canvas, ctx, canvas.height, barSpacing, scale);
  }

  useEffect(function () {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    handleResize(canvas, ctx);
    populateCanvas(canvas, ctx, canvas.height, barSpacing, scale);
    window.addEventListener("resize", () => handleResize(canvas, ctx));
    return function () {
      window.removeEventListener("resize", () => handleResize(canvas, ctx));
    };
  }, []);

  // Draws numbers and bar lines to canvas.
  function populateCanvas(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    height: number,
    remSpacing: number,
    remToPx: number
  ): void {
    ctx.lineWidth = 1;
    // ctx.font = `${textSize / 1.2}rem serif`;
    ctx.font = `${textSize}rem serif`;
    ctx.strokeStyle = getVariableStyle("--light-main");
    ctx.fillStyle = "#ffffff";

    const pxSpacing: number = remSpacing * remToPx;
    let count = 0;
    for (let i = 0; i < canvas.width; i += pxSpacing / 4) {
      if (count % 4 === 0) {
        ctx.moveTo(i + 0.5, 0);
        ctx.lineTo(i + 0.5, height);
        ctx.fillText(count / 4 + 1 + "", i + 4, height / 3);
      } else {
        ctx.moveTo(i + 0.5, height);
        ctx.lineTo(i + 0.5, height - height / 4);
      }
      count += 1;
    }
    ctx.stroke();
  }

  return (
    <div className="BarNumbers" ref={parentRef}>
      <canvas className="BarNumbers__canvas" ref={canvasRef}></canvas>
    </div>
  );
}
