import { useRef, useEffect, useState } from "react";
import { MouseInput } from "../../utils/handleMouseInput";
import { addGenericEventListener } from "../../utils/waveformPositioning";
import { convertPixelsToRem, convertRemToPixels } from "../../utils/utils";

import "./RangeSlider.scss";
export default function RangeSlider() {
  const handleRef = useRef<HTMLDivElement>(null);
  const knubRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);
  const mouse = new MouseInput();
  let lastValue: number = 0;

  function handleMouseMove(): void {
    const draggableLength = 9; //rem
    const lengthInPx = convertRemToPixels(draggableLength);
    if (mouse.mouse.isDown) {
      setValue((s) => {
        let currentVal = lastValue + mouse.mouse.x.distanceTravelled;
        if (currentVal > lengthInPx) currentVal = lengthInPx;
        if (currentVal < 0) currentVal = 0;
        return currentVal;
      });
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

  function handleValChange(ref: HTMLDivElement, length: number) {
    let valInRem = convertPixelsToRem(value);
    if (valInRem < 0) valInRem = 0;
    if (valInRem > length) valInRem = length;
    valInRem -= length;
    ref.style.transform = `translateX(${valInRem}rem)`;
  }

  useEffect(function () {
    const handle = handleRef.current!;
    const knub = knubRef.current!;
    addGenericEventListener(knub, "mousedown", mouse.handleDown);
    addGenericEventListener(window, "mousemove", (e: MouseEvent) =>
      mouse.handleMove(e, knub, handleMouseMove)
    );
    addGenericEventListener(window, "mouseup", (e: MouseEvent) =>
      mouse.handleUp(e, knub, handleMouseUp)
    );
  }, []);

  useEffect(
    function () {
      const handle = handleRef.current!;
      const knub = knubRef.current!;
      const draggableLength = convertPixelsToRem(
        handle.offsetWidth - knub.offsetWidth
      );
      handleValChange(handle, draggableLength);
    },
    [value]
  );

  return (
    <div className="RangeSlider">
      <div className="RangeSlider__handle" ref={handleRef}>
        <div className="RangeSlider__handle__knub" ref={knubRef}></div>
      </div>
    </div>
  );
}
