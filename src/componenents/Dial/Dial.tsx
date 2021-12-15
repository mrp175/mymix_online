import { useRef, useEffect } from "react";
import "./Dial.scss";
import { MouseY } from "../../types/types";
import { useAppDispatch } from "../../redux/hooks";
import { setGain } from "../../redux/slices/waveformStateSlice";
import { AppDispatch } from "../../redux/store";

const mouse: MouseY = {
  isDown: false,
  startY: 0,
  distancedTravelled: 0,
};

function handleMouseDown(e: MouseEvent): void {
  e.preventDefault();
  mouse.isDown = true;
  mouse.startY = e.clientY;
}

function handleMouseMove(
  e: MouseEvent,
  ref: HTMLDivElement,
  dispatch: AppDispatch
): void {
  if (mouse.isDown) {
    mouse.distancedTravelled = mouse.startY - e.clientY;
    ref.style.transform = `rotate(${mouse.distancedTravelled}deg)`;
    dispatch(setGain({ id: "1", value: mouse.distancedTravelled / 200 }));
  }
}

function handleMouseUp() {
  mouse.isDown = false;
}

export default function Dial() {
  const dispatch: AppDispatch = useAppDispatch();
  const knobRef = useRef<HTMLDivElement>(null);

  useEffect(function () {
    const knob = knobRef.current as HTMLDivElement;
    knob.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", (e) =>
      handleMouseMove(e, knob, dispatch)
    );
    window.addEventListener("mouseup", handleMouseUp);
    return function () {
      knob.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", (e) =>
        handleMouseMove(e, knob, dispatch)
      );
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div className="Dial">
      <div className="Dial__knob" ref={knobRef}>
        <div className="Dial__knob__line"></div>
      </div>
    </div>
  );
}
