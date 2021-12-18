import { useRef, useEffect, useState } from "react";
import "./VolumeSlider.scss";
import { MouseInput } from "../../utils/handleMouseInput";
import { addGenericEventListener } from "../../utils/waveformPositioning";
import {
  setValueToPos,
  handleMouseMove,
  handleMouseUp,
} from ".././../utils/rangeSlider";
import { RangeSlider } from "../../types/types";

export default function VolumeSlider({ min, max, init, style }: RangeSlider) {
  const parentRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const knubRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({ value: init, lastValue: init });
  const mouse = new MouseInput();

  function applyStyles(parent: HTMLDivElement, knub: HTMLDivElement) {
    parent.style.width = style.mainAxisLength + "rem";
    parent.style.height = style.crossAxisLength + "rem";
    knub.style.width = style.crossAxisLength + "rem";
    knub.style.height = style.crossAxisLength + "rem";
  }

  useEffect(function () {
    const parent = parentRef.current!;
    const handle = handleRef.current!;
    const knub = knubRef.current!;

    applyStyles(parent, knub);

    setValueToPos(
      handle,
      init,
      min,
      max,
      style.mainAxisLength,
      style.crossAxisLength,
      0
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
      mouse.handleUp(e, handle, () =>
        handleMouseUp(mouse, state.lastValue, setState)
      )
    );
  }, []);

  useEffect(
    function () {
      const handle = handleRef.current!;
      setValueToPos(
        handle,
        state.value,
        min,
        max,
        style.mainAxisLength,
        style.crossAxisLength,
        0
      );
    },
    [state.value]
  );

  return (
    <div className="VolumeSlider" ref={parentRef}>
      <div className="VolumeSlider__handle" ref={handleRef}>
        <div className="VolumeSlider__handle__knub" ref={knubRef}></div>
      </div>
    </div>
  );
}
