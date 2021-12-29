import { useRef, useEffect, useState } from "react";
import "./VolumeSlider.scss";
import { MouseInput } from "../../utils/handleMouseInput";
import { addGenericEventListener } from "../../utils/utils";
import {
  setValueToPos,
  handleMouseMove,
  handleMouseUp,
} from ".././../utils/rangeSlider";
import { VolumeSliderType } from "../../types/types";
import { useAppDispatch } from "../../redux/hooks";
import { setMouseDown } from "../../redux/slices/waveformStateSlice";

export default function VolumeSlider({
  min,
  max,
  init,
  onChange,
  style,
  id,
}: VolumeSliderType) {
  const parentRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const knubRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({ value: init, lastValue: init });
  const [localMouseDown, setLocalMouseDown] = useState(false);
  const mouse = new MouseInput();
  const dipatch = useAppDispatch();

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

    addGenericEventListener(knub, "mousedown", (e: MouseEvent) => {
      setLocalMouseDown(true);
      mouse.handleDown(e);
    });

    addGenericEventListener(window, "mousemove", (e: MouseEvent) => {
      mouse.handleMove(e, knub, () => {
        handleMouseMove(
          min,
          max,
          style.mainAxisLength,
          style.crossAxisLength,
          mouse,
          setState
        );
      });
    });

    addGenericEventListener(window, "mouseup", (e: MouseEvent) => {
      setLocalMouseDown(false);
      mouse.handleUp(e, handle, () =>
        handleMouseUp(mouse, state.lastValue, setState)
      );
    });
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
      onChange(state.value);
    },
    [state.value]
  );

  useEffect(
    function () {
      dipatch(setMouseDown({ id, value: localMouseDown }));
    },
    [localMouseDown]
  );

  return (
    <div className="VolumeSlider" ref={parentRef}>
      <div className="VolumeSlider__handle" ref={handleRef}>
        <div className="VolumeSlider__handle__knub" ref={knubRef}></div>
      </div>
    </div>
  );
}
