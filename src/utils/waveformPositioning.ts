import React from "react";
import { setPosition } from "../redux/slices/waveformStateSlice";
import { MouseX, Waveform } from "../types/types";
import { addGenericEventListener } from "./utils";
import { defaultBarSpacing, pixelsPerRem, pixelsPerBar } from "./canvas";
import { AppDispatch } from "../redux/store";

const spacing: number = defaultBarSpacing * pixelsPerRem;

const mouse: MouseX = {
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
  zoomLevelRef: React.MutableRefObject<number>,
  dispatch: AppDispatch
): void {
  const parent = parentRef.current;
  addGenericEventListener(
    parent as HTMLDivElement,
    "mousedown",
    handleMouseDown
  );
  addGenericEventListener(window, "mousemove", (e: MouseEvent) =>
    handleMouseMove(e, dispatch, parent as HTMLDivElement, zoomLevelRef)
  );
  addGenericEventListener(window, "mouseup", (e: MouseEvent) =>
    handleMouseUp(e, parent as HTMLDivElement)
  );
}

function handleMouseDown(e: MouseEvent): void {
  e.preventDefault();
  mouse.isDown = true;
  mouse.startX = e.clientX;
}

function handleMouseMove(
  e: MouseEvent,
  dispatch: AppDispatch,
  parentDiv: HTMLDivElement,
  zoomLevelRef: React.MutableRefObject<number>
): void {
  if (mouse.isDown) {
    mouse.distanceTravelled = e.clientX - mouse.startX;
    waveform.currentPositionX = waveform.startX + mouse.distanceTravelled;
    waveform.currentBar = findNearestBar(
      waveform.currentPositionX,
      zoomLevelRef
    );
    const pixels_per_bar = pixelsPerBar(174, zoomLevelRef.current);
    waveform.currentBar = Math.floor(waveform.currentBar / pixels_per_bar); // Math.floor stops incorrect result with floating point numbers. Change this once you allow moving waveforms with floats.
    dispatch(setPosition({ id: "1", value: waveform.currentBar }));
    parentDiv.style.opacity = "0.6";
  }
}

function handleMouseUp(e: MouseEvent, parentDiv: HTMLDivElement): void {
  if (mouse.isDown) {
    mouse.isDown = false;
    waveform.startX = waveform.currentBar;
    parentDiv.style.opacity = "1";
  }
}

function findNearestBar(
  waveformPositionX: number,
  spacing: React.MutableRefObject<number>
): number {
  const pixels_per_bar = pixelsPerBar(174, spacing.current);
  const nearestBar =
    Math.floor((waveformPositionX + pixels_per_bar / 2) / pixels_per_bar) *
    pixels_per_bar;
  if (nearestBar < 0) {
    return 0;
  }
  return nearestBar;
}
