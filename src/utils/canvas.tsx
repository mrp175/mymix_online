import React, { useRef } from "react";
import { getVariableStyle, convertRemToPixels } from "./utils";
import WaveformData from "waveform-data";
import { BarNumberDataState } from "../redux/slices/barNumberDataSlice";

export const lineWidth = 1;
export const font = `$1rem serif`;
export const strokeStyle = getVariableStyle("--light-main");
export const fillStyle = "#ffffff";
export const minimumLineSpacing = 4;

const remScale = 1;
const textSize = remScale / 1.45; //this is what it will be in rem.
export const defaultBarSpacing = 4; // This should scale with zoom.
export const pixelsPerRem = convertRemToPixels(remScale);

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

// any variables passed in inside the values object will has their value applied to the ctx property name that is the same name of the variable.
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

// calculates the scale x transform required for the canvas overlay so that it matches the actual waveform zoom level. This works when applied with css scaling. Function is designed to prevet constant redraws to canvas and resampling of waveform zoom level.
export function calculateScaleX(currentScale: number): number {
  if (currentScale >= 2) {
    currentScale *= 0.5;
    return calculateScaleX(currentScale);
  }
  return currentScale;
}

// draw vertical lin on canvas at specific x position from 0 y value to height value
export function drawLine(
  ctx: CanvasRenderingContext2D,
  xPos: number,
  startY: number,
  endY: number
): void {
  const x = xPos + 0.5;
  ctx.moveTo(x, startY);
  ctx.lineTo(x, endY);
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

// Recursively checks to see if lines are becoming too close together, then doubles the length between them if it falls below cetain value;
export function setPixelsPerLine(
  pixels_per_bar: number,
  spacingInRem: number
): number {
  let pixels_per_line = pixels_per_bar;
  if (pixels_per_line < convertRemToPixels(spacingInRem)) {
    pixels_per_line *= 2;
    return setPixelsPerLine(pixels_per_line, spacingInRem);
  }
  return pixels_per_line;
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
  canvas: HTMLCanvasElement,
  parentRef: React.RefObject<HTMLDivElement>,
  waveform: WaveformData,
  startOffset: number = 0,
  gain: number = 1,
  startSample: number = 0,
  length: number = 10000
) {
  canvas.height = parentRef.current?.offsetHeight as number;
  canvas.width = length;
  if (startSample + length > waveform.length) {
    canvas.width = waveform.length - startSample;
  }
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  // ctx.strokeStyle = "#164664";
  ctx.strokeStyle = "white";
  ctx.lineWidth = 1;
  ctx.fillStyle = "white";
  const channel = waveform.channel(0);
  ctx.beginPath();

  let endSample = length + startSample;

  if (endSample > waveform.length) endSample = waveform.length;

  // Loop forwards, drawing the upper half of the waveform
  for (let x = startSample; x < endSample; x++) {
    //max possible val = 127
    const val = channel.max_sample(x);
    ctx.lineTo(x - startSample + 0.5, scaleY(val, canvas.height, gain) + 0.5);
  }

  // Loop backwards, drawing the lower half of the waveform
  for (let x = endSample - 1; x >= startSample; x--) {
    const val = channel.min_sample(x);
    ctx.lineTo(x - startSample + 0.5, scaleY(val, canvas.height, gain) + 0.5);
  }

  ctx.closePath();
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

export function calculateSequencerLengthPx(
  lengthInBars: number,
  bpm: number,
  zoomLevel: number
): number {
  return lengthInBars * pixelsPerBar(bpm, zoomLevel);
}

export interface CanvasRefObj {
  [key: string]: HTMLCanvasElement | null;
}

export function createCanvases(
  refObject: React.MutableRefObject<CanvasRefObj>,
  total: WaveformData | number,
  start: number = 0,
  className: string = "canvas"
): JSX.Element[] {
  if (typeof total !== "number") {
    total = total.length;
  }
  let html: JSX.Element[] = [];
  let i = start / 10000;
  let length = start;
  do {
    const string = "_" + i;
    const canvas = (
      <canvas
        key={string}
        ref={(element) => (refObject.current[string] = element)}
        className={className}
      ></canvas>
    );
    html.push(canvas);
    i += 1;
    length += 10000;
  } while (length < total);
  return html;
}

// Create array that contains where to draw each bar line on each canvas, and what bar number should be written next to it
export function createBarNumberData(
  endPos: number,
  zoomLevel: number
): { count: number; currentPos: number }[][] {
  const pixels_per_bar = pixelsPerBar(174, zoomLevel);
  const pixels_per_line = setPixelsPerLine(pixels_per_bar, minimumLineSpacing);
  const barToLineRatio = pixels_per_line / pixels_per_bar;
  const result: { count: number; currentPos: number }[][] = [[]];
  let ref = 0;
  let count = 1;
  let canvasOffset = 0;
  for (let i = 0; i < endPos; i += pixels_per_line) {
    const currentRef = Math.floor(i / 10000);
    if (currentRef !== ref) {
      ref = currentRef;
      result.push([]);
      canvasOffset -= 10000;
    }
    result[ref].push({ count, currentPos: i + canvasOffset });
    count += barToLineRatio;
  }
  return result;
}

//Draws lines using bar number data
export function drawBarNumbers(
  refObj: React.MutableRefObject<CanvasRefObj>,
  parentRef: HTMLDivElement,
  barNumberData: BarNumberDataState[][],
  zoomLevel: number
): void {
  const pixels_per_bar = pixelsPerBar(174, zoomLevel);
  const pixels_per_line = setPixelsPerLine(pixels_per_bar, minimumLineSpacing);
  const pixelsPerSubdividingLine = pixels_per_line / 4;
  for (let i = 0; i < barNumberData.length; i += 1) {
    const canvas = refObj.current["_" + i]!;
    if (canvas) {
      canvas.width = 10000;
      canvas.height = parentRef.offsetHeight;
      canvas.style.left = 10000 * i + "px";
      const ctx = canvas.getContext("2d")!;
      applyCtxProperties(ctx, { font, lineWidth, strokeStyle, fillStyle });
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      for (let j = 0; j < barNumberData[i].length; j += 1) {
        drawLine(ctx, barNumberData[i][j].currentPos + 0.5, 0, canvas.height);
        drawText(
          ctx,
          barNumberData[i][j].currentPos + 0.5 + 3,
          canvas.height / 3,
          barNumberData[i][j].count + ""
        );
        drawLine(
          ctx,
          barNumberData[i][j].currentPos + pixelsPerSubdividingLine + 0.5,
          canvas.height,
          canvas.height / 1.5
        );
        drawLine(
          ctx,
          barNumberData[i][j].currentPos + pixelsPerSubdividingLine * 2 + 0.5,
          canvas.height,
          canvas.height / 1.5
        );
        drawLine(
          ctx,
          barNumberData[i][j].currentPos + pixelsPerSubdividingLine * 3 + 0.5,
          canvas.height,
          canvas.height / 1.5
        );
      }
      ctx.closePath();
      ctx.stroke();
    }
  }
}

export function drawBarLines(
  refObj: React.MutableRefObject<CanvasRefObj>,
  parentRef: HTMLDivElement,
  barNumberState: BarNumberDataState[][],
  zoomLevel: number
): void {
  const pixels_per_bar = pixelsPerBar(174, zoomLevel);
  const pixels_per_line = setPixelsPerLine(pixels_per_bar, minimumLineSpacing);
  const pixelsPerSubdividingLine = pixels_per_line / 4;
  for (let i = 0; i < barNumberState.length; i += 1) {
    const canvas = refObj.current["_" + i]!;
    if (canvas) {
      canvas.width = 10000;
      canvas.height = parentRef.offsetHeight;
      canvas.style.left = 10000 * i + "px";
      const ctx = canvas.getContext("2d")!;
      applyCtxProperties(ctx, { font, lineWidth, strokeStyle, fillStyle });
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      for (let j = 0; j < barNumberState[i].length; j += 1) {
        drawLine(ctx, barNumberState[i][j].currentPos + 0.5, 0, canvas.height);
        drawLine(
          ctx,
          barNumberState[i][j].currentPos + pixelsPerSubdividingLine + 0.5,
          canvas.height,
          0
        );
        drawLine(
          ctx,
          barNumberState[i][j].currentPos + pixelsPerSubdividingLine * 2 + 0.5,
          canvas.height,
          0
        );
        drawLine(
          ctx,
          barNumberState[i][j].currentPos + pixelsPerSubdividingLine * 3 + 0.5,
          canvas.height,
          0
        );
      }
      ctx.closePath();
      ctx.stroke();
    }
  }
}
