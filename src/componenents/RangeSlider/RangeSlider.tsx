import { useRef, useEffect, useState } from "react";
import { MouseInput } from "../../utils/handleMouseInput";
import { addGenericEventListener } from "../../utils/waveformPositioning";

import "./RangeSlider.scss";
export default function RangeSlider() {
  const handleRef = useRef<HTMLDivElement>(null);
  const knubRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);
  const mouse = new MouseInput();
  let lastValue: number = 0;

  function handleMouseMove(): void {
    console.log("moving knub");
    if (mouse.mouse.isDown) {
      setValue((s) => {
        return lastValue + mouse.mouse.x.distanceTravelled;
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

  useEffect(function () {
    const handle = handleRef.current;
    const knub = knubRef.current;
    if (knub) {
      console.log("knub exists");
      if (handle) handle.style.transform = `translateX(${100 - value}px)`;
      addGenericEventListener(knub, "mousedown", mouse.handleDown);
      addGenericEventListener(window, "mousemove", (e: MouseEvent) =>
        mouse.handleMove(e, knub, handleMouseMove)
      );
      addGenericEventListener(window, "mouseup", (e: MouseEvent) =>
        mouse.handleUp(e, knub, handleMouseUp)
      );
    }
  }, []);

  useEffect(
    function () {
      const handle = handleRef.current;
      if (handle) {
        handle.style.transform = `translateX(${value}px)`;
      }
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
