import { MouseState, HandleMouseInput, NewMouseState } from "../types/types";

const handleMouseDown: HandleMouseInput = function (
  this: NewMouseState,
  e,
  parentRef?,
  callback?
) {
  e.preventDefault();
  this.mouse.isDown = true;
  this.mouse.y.start = e.clientY;
  this.mouse.x.start = e.clientX;
  if (callback) {
    callback(this.mouse, parentRef);
  }
};

const handleMouseMove: HandleMouseInput = function (
  this: NewMouseState,
  e,
  parentRef?,
  callback?
) {
  if (this.mouse.isDown) {
    this.mouse.x.distanceTravelled = e.clientX - this.mouse.x.start;
    this.mouse.y.distanceTravelled = this.mouse.y.start - e.clientY;
    if (callback) {
      callback(this.mouse, parentRef);
    }
  }
};

const handleMouseUp: HandleMouseInput = function (
  this: NewMouseState,
  e,
  parentRef?,
  callback?
) {
  if (this.mouse.isDown) {
    this.mouse.x.end = e.clientX;
    this.mouse.y.end = e.clientY;
    if (callback) {
      callback(this.mouse, parentRef);
    }
    this.mouse.isDown = false;
  }
};

export class MouseInput {
  readonly mouse: MouseState;
  handleDown: HandleMouseInput;
  handleMove: HandleMouseInput;
  handleUp: HandleMouseInput;

  constructor() {
    this.mouse = {
      isDown: false,
      y: {
        start: 0,
        end: 0,
        distanceTravelled: 0,
      },
      x: {
        start: 0,
        end: 0,
        distanceTravelled: 0,
      },
    };
    this.handleDown = handleMouseDown.bind(this);
    this.handleMove = handleMouseMove.bind(this);
    this.handleUp = handleMouseUp.bind(this);
  }
}
