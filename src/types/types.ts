export interface Mouse {
  isDown: boolean;
  startX: number;
  endX: number;
  distanceTravelled: number;
}

export interface Waveform {
  startX: number;
  currentPositionX: number;
  currentBar: number;
}
