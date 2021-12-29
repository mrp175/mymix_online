import { useRef, useEffect, useState } from "react";
import "./Dial.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setGain } from "../../redux/slices/waveformStateSlice";
import { AppDispatch } from "../../redux/store";
import { MouseInput } from "../../utils/handleMouseInput";
import { NewMouseState, MouseState } from "../../types/types";
import { handleBoundaries } from "../../utils/dial";
import { initializeDialPos } from "../../utils/dial";
import {
  amplitudeToDecibels,
  decibelsToAmplitude,
  handleRangeBias,
  mapNumberRange,
} from "../../utils/utils";
import { DialState } from "../../utils/dial";
import { DialType } from "../../types/types";
import { addGenericEventListener } from "../../utils/utils";

export default function Dial({
  min,
  max,
  step,
  init,
  log,
  logType,
  dbType,
  waveformId,
}: DialType) {
  const dispatch: AppDispatch = useAppDispatch();
  const knobRef = useRef<HTMLDivElement>(null);
  const [dialPos, setDialPos] = useState<number>(0);
  const mouse = new MouseInput();
  const initDialVal = initializeDialPos(init, min, max);
  const dial = new DialState(initDialVal);

  function mapMouseToDial(mouse: MouseState) {
    const change = mouse.x.distanceTravelled * 2;
    let valueInDeg = dial.start + change;
    if (valueInDeg > 130) valueInDeg = 130;
    if (valueInDeg < -130) valueInDeg = -130;
    return valueInDeg;
  }

  function handleMouseMove(
    mouse: MouseState,
    ref: HTMLDivElement | undefined
  ): void {
    let state = 0;
    if (mouse.isDown) {
      setDialPos((s): number => {
        state = s;
        return mapMouseToDial(mouse);
      });
    }
  }

  function handleMouseUp(
    mouse: MouseState,
    ref: HTMLDivElement | undefined
  ): void {
    if (mouse.isDown) {
      setDialPos((s): number => {
        dial.start = s;
        return s;
      });
    }
  }

  useEffect(function () {
    setDialPos(dial.value);
    const knob = knobRef.current;
    if (knob) {
      addGenericEventListener(knob, "mousedown", (e: MouseEvent) =>
        mouse.handleDown(e, knob)
      );
      addGenericEventListener(window, "mousemove", (e: MouseEvent) => {
        mouse.handleMove(e, knob, handleMouseMove);
      });
      addGenericEventListener(window, "mouseup", (e: MouseEvent) =>
        mouse.handleUp(e, knob, handleMouseUp)
      );
    }
  }, []);

  useEffect(
    function () {
      if (knobRef.current) {
        knobRef.current.style.transform = `rotate(${dialPos}deg)`;
      }
    },
    [dialPos]
  );

  return (
    <div className="Dial">
      <div className="Dial__knob">
        <div className="Dial__knob__background"></div>
        <div className="Dial__knob__highlight"></div>
        <div className="Dial__knob__line__container" ref={knobRef}>
          <div className="Dial__knob__line"></div>
        </div>
      </div>
    </div>
  );
}

// function moveKnob(mouse: MouseState, knobRef) {
//   currentValue = startingValue + mouse.y.distanceTravelled ;
//   if (currentValue < min) currentValue = min;
//   if (currentValue > max) currentValue = max;
//   currentValue = Math.floor(currentValue / step) * step;
//   currentValue = mapNumberRange(currentValue, min, max, 0, 1);
//   currentValue = handleRangeBias(currentValue, log, logType) as number;
//   // if (dbType === "db") currentValue = amplitudeToDecibels(currentValue);
// }
