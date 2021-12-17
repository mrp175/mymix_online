import { useRef, useEffect, useState } from "react";
import { MouseInput } from "../../utils/handleMouseInput";
import { addGenericEventListener } from "../../utils/waveformPositioning";
import { convertPixelsToRem, mapNumberRange } from "../../utils/utils";

import "./RangeSlider.scss";
import { current } from "@reduxjs/toolkit";
export default function RangeSlider({
  style,
  min,
  max,
  init,
}: {
  min: number;
  max: number;
  init: number;
  style: { mainAxisLength: number; crossAxisLength: number };
}) {
  const parentRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const knubRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(init);
  const mouse = new MouseInput();
  let lastValue: number = init;

  function applyStyles(parent: HTMLDivElement, knub: HTMLDivElement) {
    parent.style.width = style.mainAxisLength + "rem";
    parent.style.height = style.crossAxisLength + "rem";
    knub.style.width = style.crossAxisLength + "rem";
    knub.style.height = style.crossAxisLength + "rem";
  }

  function setValueToPos(handle: HTMLDivElement, value: number) {
    const initInRem = mapNumberRange(
      value,
      min,
      max,
      0 + style.crossAxisLength,
      style.mainAxisLength
    );
    handle.style.transform = `translateX(-${
      style.mainAxisLength - initInRem
    }rem)`;
  }

  function handleMouseMove(): void {
    if (mouse.mouse.isDown) {
      const lastValueRem = mapNumberRange(
        lastValue,
        min,
        max,
        0 + style.crossAxisLength,
        style.mainAxisLength
      );
      let currentValue =
        lastValueRem + convertPixelsToRem(mouse.mouse.x.distanceTravelled);
      if (currentValue > style.mainAxisLength)
        currentValue = style.mainAxisLength;
      if (currentValue < 0 + style.crossAxisLength)
        currentValue = 0 + style.crossAxisLength;
      currentValue = mapNumberRange(
        currentValue,
        0 + style.crossAxisLength,
        style.mainAxisLength,
        min,
        max
      );
      setValue(currentValue);
    }
  }

  function handleMouseUp(): void {
    if (mouse.mouse.isDown) {
      setValue((s) => {
        lastValue = s;
        return s;
      });
    }
  }

  useEffect(function () {
    const parent = parentRef.current!;
    const handle = handleRef.current!;
    const knub = knubRef.current!;

    applyStyles(parent, knub);
    setValueToPos(handle, init);

    addGenericEventListener(knub, "mousedown", mouse.handleDown);
    addGenericEventListener(window, "mousemove", (e: MouseEvent) =>
      mouse.handleMove(e, knub, handleMouseMove)
    );
    addGenericEventListener(window, "mouseup", (e: MouseEvent) =>
      mouse.handleUp(e, handle, handleMouseUp)
    );
  }, []);

  useEffect(
    function () {
      const handle = handleRef.current!;
      setValueToPos(handle, value);
    },
    [value]
  );

  return (
    <div className="RangeSlider" ref={parentRef}>
      <div className="RangeSlider__handle" ref={handleRef}>
        <div className="RangeSlider__handle__knub" ref={knubRef}></div>
      </div>
    </div>
  );
}
