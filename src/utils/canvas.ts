import { getVariableStyle } from "./utils";

// Draws numbers and bar lines to canvas.
export function populateCanvas(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  height: number,
  remSpacing: number,
  remToPx: number,
  textSize: number,
  trackLane?: boolean
): void {
  ctx.lineWidth = 1;
  ctx.font = `${textSize}rem serif`;
  ctx.strokeStyle = getVariableStyle("--light-main");
  ctx.fillStyle = "#ffffff";

  const pxSpacing: number = remSpacing * remToPx;
  let count = 0;
  for (let i = 0; i < canvas.width; i += pxSpacing / 4) {
    if (trackLane) {
      ctx.moveTo(i + 0.5, 0);
      ctx.lineTo(i + 0.5, height);
      console.log("in tracklane", i);
    } else if (count % 4 === 0) {
      ctx.moveTo(i + 0.5, 0);
      ctx.lineTo(i + 0.5, height);
      ctx.fillText(count / 4 + 1 + "", i + 4, height / 3);
    } else {
      ctx.moveTo(i + 0.5, height);
      ctx.lineTo(i + 0.5, height - height / 4);
    }
    count += 1;
  }
  console.log("about to stroke");
  ctx.stroke();
}

export function handleResize(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  parentRef: React.RefObject<HTMLDivElement>,
  barSpacing: number,
  scale: number,
  textSize: number,
  trackLane?: boolean
): void {
  // canvas.width = 0 as number;
  canvas.height = parentRef.current?.offsetHeight as number;
  canvas.width = parentRef.current?.offsetWidth as number;
  populateCanvas(
    canvas,
    ctx,
    canvas.height,
    barSpacing,
    scale,
    textSize,
    trackLane
  );
}

//setTimeout is currently required for page resizes to work properly. As code is run synchronously, setting canvasWidth to 0 doesn't work as another function has already done that and then set the canvas to the offset width. Setting canvas width to 0 must be done on all of the canvas elements before setting them to match the offsetwidth.
