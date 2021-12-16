import { mapNumberRange } from "./utils";

export function handleBoundaries(
  min: number,
  max: number,
  currentValue: number
) {
  if (currentValue < min) {
    currentValue = min;
  }
  if (currentValue > max) {
    currentValue = max;
  }
  return currentValue;
}

export class DialState {
  start: number;
  value: number;
  constructor(value: number) {
    this.value = value;
    this.start = value;
  }
}

export function initializeDialPos(init: number, min: number, max: number) {
  return mapNumberRange(init, min, max, -130, 130);
}
