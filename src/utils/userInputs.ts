import React from "react";
import { setPosition } from "../redux/slices/waveformStateSlice";
import { Mouse, Waveform } from "../types/types";
import { convertRemToPixels } from "./utils";
import { barSpacing, scale } from "./canvas";

const spacing: number = barSpacing * scale;

const mouse: Mouse = {
  isDown: false,
  startX: 0,
  endX: 0,
  distanceTravelled: 0,
};

const waveform: Waveform = {
  startX: 0,
  currentPositionX: 0,
  currentBar: 0,
};

// Adds event listeners for mousedown, mousemove and mouseup.
export function handleUserInput(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  parentRef: React.RefObject<HTMLDivElement>,
  id: string,
  dispatch: any
): void {
  const parent = parentRef.current;
  addGenericEventListener(
    parent as HTMLDivElement,
    "mousedown",
    (e: MouseEvent) => handleMouseDown(e)
  );
  addGenericEventListener(window, "mousemove", (e: MouseEvent) =>
    handleMouseMove(e as MouseEvent, dispatch)
  );
  addGenericEventListener(window, "mouseup", (e: MouseEvent) =>
    handleMouseUp(e)
  );
}

function addGenericEventListener(
  ref: HTMLDivElement | (Window & typeof globalThis),
  type: string,
  callback: any //Fix this once you figure out why it doesn't allow (e: MouseEvent) => void as a type here. It's is convinced it is an EventListenerOrEventListenerObject which is not compatible with MouseEvent
): () => void {
  ref.addEventListener(type, callback);
  return function () {
    ref.removeEventListener(type, callback);
  };
}

function handleMouseDown(e: MouseEvent): void {
  mouse.isDown = true;
  mouse.startX = e.clientX;
  console.log("mouse start X", e.clientX);
}

function handleMouseMove(e: MouseEvent, dispatch: any): void {
  if (mouse.isDown) {
    mouse.distanceTravelled = e.clientX - mouse.startX;
    waveform.currentPositionX = waveform.startX + mouse.distanceTravelled;
    waveform.currentBar = findNearestBar(waveform.currentPositionX, spacing);
    dispatch(setPosition({ id: "1", value: waveform.currentBar }));
  }
}

function handleMouseUp(e: MouseEvent): void {
  if (mouse.isDown) {
    mouse.isDown = false;
    waveform.startX = waveform.currentBar;
    console.log("mouse up");
  }
}

function findNearestBar(waveformPositionX: number, spacing: number): number {
  return Math.floor((waveformPositionX + spacing / 2) / spacing) * spacing;
}
