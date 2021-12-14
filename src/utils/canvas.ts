import React, { useRef, useEffect } from "react";
import { getVariableStyle } from "./utils";
import { convertRemToPixels } from "./utils";
import WaveformData from "waveform-data";

const remScale = 1;
const textSize = remScale / 1.45; //this is what it will be in rem.
export const barSpacing = 7; // This should scale with zoom.
export const scale = convertRemToPixels(remScale);

// Create refs
export function useCreateRefs(): [
  React.RefObject<HTMLCanvasElement>,
  React.RefObject<HTMLDivElement>
] {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  return [canvasRef, parentRef];
}

// Draws numbers and bar lines to canvas. Used for the bar count at top of sequencer, and the backdrop for each tracklane.
export function populateCanvas(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  height: number,
  remSpacing: number,
  remToPx: number,
  textSize: number,
  trackLane?: boolean // if true, doesn't draw numbers or half length lines. For use in a track lane only.
): void {
  ctx.lineWidth = 1;
  ctx.font = `${textSize}rem serif`;
  ctx.strokeStyle = getVariableStyle("--light-main");
  ctx.fillStyle = "#ffffff";

  const pxSpacing: number = remSpacing * remToPx;
  let count = 0;
  ctx.beginPath();
  for (let i = 0; i < canvas.width; i += pxSpacing / 4) {
    if (trackLane) {
      ctx.moveTo(i + 0.5, 0);
      ctx.lineTo(i + 0.5, height);
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
  ctx.stroke();
}

// Handles adjust canvas width and redraws content when screen width changes.
export function handleResize(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  parentRef: React.RefObject<HTMLDivElement>,
  trackLane?: boolean // if true, doesn't draw numbers or half length lines. For use in a track lane only.
): void {
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

// adds event listener for page resize and calls handleResize to deal with it
export function useUseEffect(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  parentRef: React.RefObject<HTMLDivElement>,
  trackLane?: boolean
): void {
  useEffect(function () {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    handleResize(canvas, ctx, parentRef, trackLane);
    window.addEventListener("resize", () =>
      handleResize(canvas, ctx, parentRef, trackLane)
    );
    return function () {
      window.removeEventListener("resize", () =>
        handleResize(canvas, ctx, parentRef, trackLane)
      );
    };
  }, []);
}

//draw waveform to canvas
export function generateWaveform(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  parentRef: React.RefObject<HTMLDivElement>,
  waveform: WaveformData,
  zoomLevel: number = 128,
  position: number = 0
) {
  const canvas = canvasRef.current as HTMLCanvasElement;
  canvas.height = parentRef.current?.offsetHeight as number;
  canvas.width = 2000;

  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  ctx.strokeStyle = "#164664";
  ctx.fillStyle = "rgb(86,167,219)";
  ctx.fillRect(0, 0, waveform.length, canvas.height);
  const channel = waveform.channel(0);
  ctx.beginPath();

  for (let x = position; x < waveform.length; x += 1) {
    const val = channel.max_sample(x);
    ctx.rect(
      x - position + 0.5,
      scaleY(val, canvas.height),
      0,
      canvas.height - scaleY(val, canvas.height) * 2
    );
  }

  ctx.stroke();
}

function scaleY(amplitude: number, height: number): number {
  const range = 256;
  const offset = 128;
  return height - ((amplitude + offset) * height) / range;
}
