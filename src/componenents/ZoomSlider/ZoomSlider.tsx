import { useRef, useEffect, useState } from "react";
import "./ZoomSlider.scss";
import { drawToCanvas } from ".././../utils/rangeSlider";
import { RangeSlider } from "../../types/types";
import { addGenericEventListener } from "../../utils/utils";
import {
  setValueToPos,
  handleMouseMove,
  handleMouseUp,
} from ".././../utils/rangeSlider";
import { MouseInput } from "../../utils/handleMouseInput";
import { convertPixelsToRem, getVariableStyle } from "../../utils/utils";
import { useAppDispatch } from "../../redux/hooks";
import { setMouseDown } from "../../redux/slices/zoomLevelSlice";

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
  const svgRef = useRef<SVGSVGElement>(null);
  const [state, setState] = useState({ value: init, lastValue: init });
  const mouse = new MouseInput();
  const knubSize = 0.4;

  const accentColor = getVariableStyle("--accent-color");
  const darkAlt = getVariableStyle("--dark-alt");

  const dispatch = useAppDispatch();

  function applyStyles(
    parent: HTMLDivElement,
    knub: HTMLDivElement,
    canvas: HTMLCanvasElement,
    container: HTMLDivElement,
    svg: SVGSVGElement,
    knubSize: number, // rem
    padding: number // rem
  ) {
    parent.style.padding = padding + "rem";
    parent.style.width = style.mainAxisLength + "rem";
    parent.style.height = "100%";
    knub.style.height = style.crossAxisLength * knubSize * 1.5 + "rem";
    knub.style.width = style.crossAxisLength * knubSize + "rem";
    container.style.height = "100%";
    container.style.width = "100%";
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    svg.style.width = style.crossAxisLength * knubSize + "rem";
    svg.style.fill = accentColor;
    svg.style.stroke = darkAlt;
    svg.style.strokeWidth = "1";
  }

  useEffect(function () {
    const parent = parentRef.current!;
    const knub = knubRef.current!;
    const canvas = canvasRef.current!;
    const container = containerRef.current!;
    const svg = svgRef.current!;
    applyStyles(parent, knub, canvas, container, svg, knubSize, 0.5);

    drawToCanvas(canvas, 0.04);

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
      mouse.handleMove(e, knub, () => {
        dispatch(setMouseDown(true));
        handleMouseMove(
          min,
          max,
          style.mainAxisLength,
          style.crossAxisLength,
          mouse,
          setState
        );
      })
    );

    addGenericEventListener(window, "mouseup", (e: MouseEvent) =>
      mouse.handleUp(e, knub, () => {
        dispatch(setMouseDown(false));
        handleMouseUp(mouse, state.lastValue, setState);
      })
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
      onChange(state.value);
    },
    [state.value]
  );

  const path = "M 0 0 L 7 0 L 7 6 L 4 12 L 3 12 L 0 6 L 0 0";
  const viewBox = "0 0 7 12";

  return (
    <div className="ZoomSlider" ref={parentRef}>
      <div className="ZoomSlider__container" ref={containerRef}>
        <canvas
          className="ZoomSlider__container__canvas"
          ref={canvasRef}
        ></canvas>
        <div className="ZoomSlider__container__knub" ref={knubRef}>
          <svg
            className="ZoomSlider__container__knub__svg"
            viewBox={viewBox}
            ref={svgRef}
          >
            <path d={path} />
          </svg>
        </div>
      </div>
    </div>
  );
}
