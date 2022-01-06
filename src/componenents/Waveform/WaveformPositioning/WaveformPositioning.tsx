import React, { useEffect, useState, useRef } from "react";
import {
  onMouseDown,
  onMouseMove,
  onMouseUp,
} from "../../../utils/waveformPositioning";
import {
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
} from "../../../utils/mouseInputs";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setPosition } from "../../../redux/slices/waveformStateSlice";
import { addGenericEventListener } from "../../../utils/utils";
import { defaultMouseState } from "../../../utils/mouseInputs";

export default function WaveformPositioning({
  parentRef,
}: {
  parentRef: React.RefObject<HTMLDivElement>;
}) {
  const [waveformPosition, setWaveformPosition] = useState({
    currentPosition: 0,
    lastPosition: 0,
    mouseDown: false,
  });

  const [mouse, setMouse] = useState({
    ...defaultMouseState,
  });
  const mouseRef = useRef(mouse);

  const { zoomLevel } = useAppSelector((state) => state.zoomLevel);
  const zoomLevelRef = useRef(zoomLevel);

  const dispatch = useAppDispatch();

  // Add event listeners to handle mouse inputs and adjust waveform position accordingly
  useEffect(
    function () {
      const parent = parentRef.current!;
      addGenericEventListener(parent, "mousedown", (e: MouseEvent) => {
        handleMouseDown(e, setMouse);
        onMouseDown(e);
      });
      addGenericEventListener(window, "mousemove", (e: MouseEvent) => {
        if (mouseRef.current.isDown) {
          handleMouseMove(e, setMouse);
          onMouseMove(setWaveformPosition, zoomLevelRef, mouseRef);
        }
      });
      addGenericEventListener(window, "mouseup", (e: MouseEvent) => {
        if (mouseRef.current.isDown) {
          handleMouseUp(e, setMouse);
          onMouseUp(setWaveformPosition);
        }
      });
    },
    [parentRef.current]
  );

  useEffect(
    function () {
      const pos = waveformPosition.currentPosition;
      dispatch(setPosition({ id: "1", value: pos }));
    },
    [waveformPosition.currentPosition]
  );

  useEffect(
    function () {
      zoomLevelRef.current = zoomLevel;
      mouseRef.current = mouse;
    },
    [zoomLevel, mouse]
  );

  return null;
}
