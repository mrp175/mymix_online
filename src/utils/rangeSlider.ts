import {
  convertRemToPixels,
  handleRangeBias,
  getVariableStyle,
  mapNumberRange,
  convertPixelsToRem,
} from "./utils";
import { MouseInput } from "./handleMouseInput";

type SetValue = React.Dispatch<
  React.SetStateAction<{
    value: number;
    lastValue: number;
  }>
>;

export function setValueToPos(
  ref: HTMLDivElement,
  value: number,
  min: number,
  max: number,
  mainAxisLength: number,
  mainAxisOffset: number,
  knubOffset: number
): void {
  const valueInRem = mapNumberRange(
    value,
    min,
    max,
    0 + mainAxisOffset,
    mainAxisLength
  );
  ref.style.transform = `translateX(${
    -(mainAxisLength - valueInRem) + knubOffset
  }rem)`;
}

export function handleMouseMove(
  min: number,
  max: number,
  mainAxisLength: number,
  mainAxisOffset: number,
  mouse: MouseInput,
  setValue: SetValue
): void {
  if (mouse.mouse.isDown) {
    setValue((s) => {
      const lastValueRem = mapNumberRange(
        s.lastValue,
        min,
        max,
        0 + mainAxisOffset,
        mainAxisLength
      );
      let currentValue =
        lastValueRem + convertPixelsToRem(mouse.mouse.x.distanceTravelled);
      if (currentValue > mainAxisLength) currentValue = mainAxisLength;
      if (currentValue < 0 + mainAxisOffset) currentValue = 0 + mainAxisOffset;
      currentValue = mapNumberRange(
        currentValue,
        0 + mainAxisOffset,
        mainAxisLength,
        min,
        max
      );

      const newState = { ...s };
      newState.value = currentValue;
      return newState;
    });
  }
}

export function handleMouseUp(
  mouse: MouseInput,
  lastValue: number,
  setValue: SetValue
): void {
  if (mouse.mouse.isDown) {
    setValue((s) => {
      const newState = { ...s };
      newState.lastValue = newState.value;
      return newState;
    });
  }
}

export function drawToCanvas(canvas: HTMLCanvasElement, interval: number) {
  const scale: number = convertRemToPixels(1);
  const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;
  ctx.lineWidth = 1;
  ctx.strokeStyle = "white";
  const gap = 0.2;

  for (let i = 0; i <= 1; i += interval) {
    const pos = handleRangeBias(i, 0.4, "exp")! * canvas.width;
    ctx.moveTo(pos + 0.5, canvas.height * 0.6);
    ctx.lineTo(pos + 0.5, canvas.height * 0.8);
  }
  ctx.moveTo(0, canvas.height * gap);
  ctx.lineTo(canvas.width, canvas.height * gap);
  ctx.stroke();
}
