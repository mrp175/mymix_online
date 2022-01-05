import { MouseState } from "../types/types";
import { pixelsPerBar } from "./canvas";

//Declare function interfaces-----------
type SetWaveformPosition = React.Dispatch<
  React.SetStateAction<{
    currentPosition: number;
    lastPosition: number;
    mouseDown: boolean;
  }>
>;

interface OnMouseDown {
  (e: MouseEvent): void;
}

interface OnMouseMove {
  (
    setWaveformPosition: SetWaveformPosition,
    zoomLevelRef?: React.MutableRefObject<number>,
    mouseStateRef?: React.MutableRefObject<MouseState>
  ): void;
}

interface OnMouseUp {
  (setWaveformPosition: SetWaveformPosition): void;
}

interface SnapToGrid {
  (position: number, gridSize: number): number;
}

//-------------------------------------

//Prevents any unwanted actions on mouse down
export const onMouseDown: OnMouseDown = function (e) {
  e.preventDefault();
};

// Calculates number of bars/units the waveform needs to move and updates the state
export const onMouseMove: OnMouseMove = function (
  setWaveformPosition,
  zoomLevelRef,
  mouseState
) {
  setWaveformPosition((state) => {
    const newState = { ...state };
    const pixels_per_bar = pixelsPerBar(174, zoomLevelRef?.current!);
    const distancedTravelled = mouseState?.current.x.distanceTravelled!;
    const currentPosition =
      (state.lastPosition * pixels_per_bar + distancedTravelled) /
      pixels_per_bar;
    newState.currentPosition = snapToGrid(currentPosition, 1);
    return newState;
  });
};

//Sets the last position property of state to the current position. This value will be used the next time onMouseMove is called
export const onMouseUp: OnMouseUp = function (setWaveformPosition) {
  setWaveformPosition((state) => {
    const newState = { ...state };
    newState.lastPosition = newState.currentPosition;
    return newState;
  });
};

//Snaps waveform to nearest grid point as declared in the gridSize parameter
export const snapToGrid: SnapToGrid = function (position, gridSize) {
  const scalingFactor = 1 / gridSize;
  const closestGridPoint = Math.floor(position * scalingFactor + 0.5);
  if (closestGridPoint < 0) {
    return 0;
  }
  return closestGridPoint / scalingFactor;
};
