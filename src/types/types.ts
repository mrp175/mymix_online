export interface MouseX {
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

export interface MouseY {
  isDown: boolean;
  startY: number;
  distancedTravelled: number;
}

export interface MouseState {
  isDown: boolean;
  x: {
    start: number;
    end: number;
    distanceTravelled: number;
  };
  y: {
    start: number;
    end: number;
    distanceTravelled: number;
  };
}

export interface NewMouseState {
  mouse: MouseState;
  handleDown: HandleMouseInput;
  handleMove: HandleMouseInput;
  handleUp: HandleMouseInput;
}

export type HandleMouseInput = (
  e: MouseEvent,
  parentRef?: HTMLDivElement | undefined,
  callback?:
    | ((
        mouse: MouseState,
        parentRef?: HTMLDivElement | undefined,
        state?: number
      ) => void)
    | undefined
) => void;

export type HandleMouseInput2 = (
  e: MouseEvent,
  state: number,
  parentRef?: HTMLDivElement | undefined,
  callback?:
    | ((
        mouse: MouseState,
        parentRef?: HTMLDivElement | undefined,
        state?: number
      ) => void)
    | undefined
) => void;

export interface DialType {
  min: number;
  max: number;
  step: number;
  init: number;
  log: number;
  logType: "exp" | "log";
  dbType: "db" | "linear";
  waveformId: string;
}

export interface RangeSlider {
  min: number;
  max: number;
  init: number;
  style: {
    // direction: "vertical" | "horizontal";
    mainAxisLength: number;
    crossAxisLength: number;
  };
  onChange: (val: number) => void;
}

export interface VolumeSliderType extends RangeSlider {
  id: string;
}
