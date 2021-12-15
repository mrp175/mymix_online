import { useRef, useEffect } from "react";
import "./Dial.scss";
import { MouseY } from "../../types/types";

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

function handleMouseMove(e: MouseEvent, ref: HTMLDivElement): void {
  if (mouse.isDown) {
    mouse.distancedTravelled = mouse.startY - e.clientY;
    ref.style.transform = `rotate(${mouse.distancedTravelled}deg)`;
    console.log(mouse.distancedTravelled);
  }
}

function handleMouseUp() {
  mouse.isDown = false;
}

export default function Dial() {
  const knobRef = useRef<HTMLDivElement>(null);

  useEffect(function () {
    const knob = knobRef.current as HTMLDivElement;
    knob.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", (e) => handleMouseMove(e, knob));
    window.addEventListener("mouseup", handleMouseUp);
    return function () {
      knob.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", (e) => handleMouseMove(e, knob));
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
