import React, { useRef, useEffect } from "react";
import { getVariableStyle } from "./utils";
import { convertRemToPixels } from "./utils";
import WaveformData from "waveform-data";

export const lineWidth = 1;
export const font = `$1rem serif`;
export const strokeStyle = getVariableStyle("--light-main");
export const fillStyle = "#ffffff";

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

type CtxStringPropName = "strokeStyle" | "font" | "fillStyle";
type CtxNumberPropName = "lineWidth";

export function applyCtxProperties(
  ctx: CanvasRenderingContext2D,
  values: { [key: string]: string | number }
): void {
  const propertyNames = Object.keys(values);
  for (let i = 0; i < propertyNames.length; i += 1) {
    if (typeof values[propertyNames[i]] === "string") {
      const propName = propertyNames[i] as CtxStringPropName;
      ctx[propName] = values[propertyNames[i]] as string;
    } else {
      const propName = propertyNames[i] as CtxNumberPropName;
      ctx[propName] = values[propertyNames[i]] as number;
    }
  }
}

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

// Draws numbers and bar lines to canvas. Used for the bar count at top of sequencer, and the backdrop for each tracklane.
// export function populateCanvas(
//   canvas: HTMLCanvasElement,
//   ctx: CanvasRenderingContext2D,
//   height: number,
//   remSpacing: number,
//   remToPx: number,
//   textSize: number,
//   trackLane?: boolean // if true, doesn't draw numbers or half length lines. For use in a track lane only.
// ): void {
//   ctx.lineWidth = 1;
//   ctx.font = `${textSize}rem serif`;
//   ctx.strokeStyle = getVariableStyle("--light-main");
//   ctx.fillStyle = "#ffffff";

//   const pxSpacing: number = remSpacing * remToPx;
//   let count = 0;
//   ctx.beginPath();
//   for (let i = 0; i < canvas.width; i += pxSpacing / 4) {
//     if (trackLane) {
//       ctx.moveTo(i + 0.5, 0);
//       ctx.lineTo(i + 0.5, height);
//     } else if (count % 4 === 0) {
//       ctx.moveTo(i + 0.5, 0);
//       ctx.lineTo(i + 0.5, height);
//       ctx.fillText(count / 4 + 1 + "", i + 4, height / 3);
//     } else {
//       ctx.moveTo(i + 0.5, height);
//       ctx.lineTo(i + 0.5, height - height / 4);
//     }
//     count += 1;
//   }
//   ctx.stroke();
// }

// draw vertical lin on canvas at specific x position from 0 y value to height value
export function drawLine(
  ctx: CanvasRenderingContext2D,
  xPos: number,
  height: number
): void {
  const x = xPos + 0.5;
  ctx.moveTo(x, 0);
  ctx.lineTo(x, height);
}

// draw text on canvas at specific x and y position
export function drawText(
  ctx: CanvasRenderingContext2D,
  xPos: number,
  y: number,
  text: string
): void {
  const x = xPos + 0.5;
  ctx.fillText(text, x, y);
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
  //need to populate canvas here
}

// adds event listener for page resize and calls handleResize to deal with it
export function addResizeEventListeners(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  parentRef: React.RefObject<HTMLDivElement>,
  trackLane?: boolean
): () => void {
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
}

//draw waveform to canvas
export function generateWaveform(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  parentRef: React.RefObject<HTMLDivElement>,
  waveform: WaveformData,
  startOffset: number = 0,
  gain: number = 1
) {
  const canvas = canvasRef.current as HTMLCanvasElement;
  canvas.height = parentRef.current?.offsetHeight as number;
  canvas.width = 2000;

  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  ctx.strokeStyle = "#164664";
  ctx.lineWidth = 1;
  ctx.fillStyle = "rgb(86,167,219)";
  ctx.fillRect(0, 0, waveform.length, canvas.height);
  ctx.fillStyle = "#164664";
  const channel = waveform.channel(0);
  ctx.beginPath();

  let length = 2000;
  if (length > waveform.length) length = waveform.length;

  for (let x = startOffset; x < length; x += 2) {
    const val = channel.max_sample(x);
    ctx.rect(
      x - startOffset + 0.5,
      scaleY(val, canvas.height, gain),
      2,
      canvas.height - scaleY(val, canvas.height, gain) * 2
    );
  }

  ctx.stroke();
  ctx.fill();
}

function scaleY(amplitude: number, height: number, gain: number): number {
  const range = 256;
  const offset = 128;
  return height - ((amplitude * gain + offset) * height) / range;
}

export function barsPerSecond(bpm: number): number {
  const beatsPerSecond = bpm / 60;
  return beatsPerSecond / 4;
}

export function secondsPerBar(bpm: number): number {
  const beatsPerSecond = bpm / 60;
  return 1 / (beatsPerSecond / 4);
}

export function pixelsPerSecond(zoomLevel: number): number {
  return 44100 / zoomLevel;
}

export function pixelsPerBar(bpm: number, zoomLevel: number): number {
  return pixelsPerSecond(zoomLevel) / barsPerSecond(bpm);
}
