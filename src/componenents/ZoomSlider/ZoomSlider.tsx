import { useRef, useEffect, useState } from "react";
import "./ZoomSlider.scss";
import { drawToCanvas } from ".././../utils/rangeSlider";
import { RangeSlider } from "../../types/types";
import { addGenericEventListener } from "../../utils/waveformPositioning";
import {
  setValueToPos,
  handleMouseMove,
  handleMouseUp,
} from ".././../utils/rangeSlider";
import { MouseInput } from "../../utils/handleMouseInput";
import {
  convertPixelsToRem,
  handleRangeBias,
  mapNumberRange,
} from "../../utils/utils";

export default function ZoomSlider({
  min,
  max,
  init,
  style,
  onChange,
}: RangeSlider) {
  const parentRef = useRef<HTMLDivElement>(null);
  const knubRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const knubBottomRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({ value: init, lastValue: init });
  const mouse = new MouseInput();
  const knubSize = 0.4;

  function applyStyles(
    parent: HTMLDivElement,
    knub: HTMLDivElement,
    canvas: HTMLCanvasElement,
    container: HTMLDivElement,
    knubBottom: HTMLDivElement,
    knubSize: number, // rem
    padding: number // rem
  ) {
    parent.style.padding = padding + "rem";
    parent.style.width = style.mainAxisLength + "rem";
    parent.style.height = "100%";
    knub.style.height = style.crossAxisLength * knubSize * 1.5 + "rem";
    knub.style.width = style.crossAxisLength * knubSize + "rem";
    knubBottom.style.borderLeft = `${knubSize}rem solid transparent`;
    knubBottom.style.borderRight = `${knubSize}rem solid transparent`;
    knubBottom.style.borderTop = `${knubSize * 2}rem solid white`;
    container.style.height = "100%";
    container.style.width = "100%";
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
  }

  useEffect(function () {
    const parent = parentRef.current!;
    const knub = knubRef.current!;
    const canvas = canvasRef.current!;
    const container = containerRef.current!;
    const knubBottom = knubBottomRef.current!;

    applyStyles(parent, knub, canvas, container, knubBottom, knubSize, 0.5);

    drawToCanvas(canvas, 0.06);

    setValueToPos(
      knub,
      init,
      min,
      max,
      convertPixelsToRem(canvas.width),
      0,
      knubSize
    );

    addGenericEventListener(knub, "mousedown", mouse.handleDown);

    addGenericEventListener(window, "mousemove", (e: MouseEvent) =>
      mouse.handleMove(e, knub, () =>
        handleMouseMove(
          min,
          max,
          style.mainAxisLength,
          style.crossAxisLength,
          mouse,
          setState
        )
      )
    );

    addGenericEventListener(window, "mouseup", (e: MouseEvent) =>
      mouse.handleUp(e, knub, () =>
        handleMouseUp(mouse, state.lastValue, setState)
      )
    );
  }, []);

  useEffect(
    function () {
      const knub = knubRef.current!;
      const canvas = canvasRef.current!;
      setValueToPos(
        knub,
        state.value,
        min,
        max,
        convertPixelsToRem(canvas.width),
        0,
        knubSize
      );
      let mappedValue: number = handleRangeBias(state.value, 0.6, "log")!;
      mappedValue = mapNumberRange(mappedValue, min, max, 128, 40000);
      onChange(mappedValue);
    },
    [state.value]
  );

  return (
    <div className="ZoomSlider" ref={parentRef}>
      <div className="ZoomSlider__container" ref={containerRef}>
        <canvas
          className="ZoomSlider__container__canvas"
          ref={canvasRef}
        ></canvas>
        <div className="ZoomSlider__container__knub" ref={knubRef}>
          <div className="knub__top"></div>
          <div className="knub__bottom" ref={knubBottomRef}></div>
        </div>
      </div>
    </div>
  );
}
