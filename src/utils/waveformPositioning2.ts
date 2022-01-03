import { MouseState } from "../types/types";
import { pixelsPerBar } from "./canvas";

type onMouseChange = (
  e: MouseEvent,
  setWaveformPosition: React.Dispatch<
    React.SetStateAction<{
      currentPosition: number;
      lastPosition: number;
      mouseDown: boolean;
    }>
  >,
  zoomLevelRef?: React.MutableRefObject<number>,
  mouseStateRef?: React.MutableRefObject<MouseState>
) => void;

export const onMouseDown: onMouseChange = function (e, setWaveformPosition) {
  e.preventDefault();
  setWaveformPosition((state) => {
    const newState = { ...state };
    return newState;
  });
};

export const onMouseMove: onMouseChange = function (
  e,
  setWaveformPosition,
  zoomLevelRef,
  mouseState
) {
  setWaveformPosition((state) => {
    const newState = { ...state };
    const pixels_per_bar = pixelsPerBar(174, zoomLevelRef?.current!);
    const distancedTravelled = mouseState?.current.x.distanceTravelled!;
    const currentPosition =
      (state.lastPosition * pixels_per_bar +
        mouseState?.current.x.distanceTravelled!) /
      pixels_per_bar;
    newState.currentPosition = snapToGrid(currentPosition, 1);
    return newState;
  });
};

export const onMouseUp: onMouseChange = function (e, setWaveformPosition) {
  setWaveformPosition((state) => {
    const newState = { ...state };
    newState.lastPosition = newState.currentPosition;
    console.log(newState);
    return newState;
  });
};

function snapToGrid(position: number, gridSize: number): number {
  const scalingFactor = 1 / gridSize;
  const closestGridPoint = Math.floor(position * scalingFactor + 0.5);
  if (closestGridPoint < 0) {
    return 0;
  }
  return closestGridPoint / scalingFactor;
}
