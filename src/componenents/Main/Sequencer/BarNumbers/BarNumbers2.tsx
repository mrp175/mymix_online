import { useState, useEffect, useRef } from "react";
import "./BarNumbers.scss";
import { useAppSelector } from "../../../../redux/hooks";
import {
  lineWidth,
  font,
  strokeStyle,
  fillStyle,
  applyCtxProperties,
  createCanvases,
  CanvasRefObj,
  calculateSequencerLengthPx,
  populateCanvasBarNumbers,
} from "../../../../utils/canvas";

export default function BarNumbers() {
  const [canvases, setCanvases] = useState<JSX.Element[]>([]);
  const componentRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const canvasRefObj = useRef<CanvasRefObj>({});
  const { zoomLevel, mouseDown } = useAppSelector((state) => state.zoomLevel);
  const sequencerLengthBars = useAppSelector(
    (state) => state.sequencerLength.length
  );
  const sequencerLengthPx = calculateSequencerLengthPx(
    sequencerLengthBars,
    174,
    zoomLevel
  );

  // Create required canvases based on sequencer length
  useEffect(function () {
    setCanvases(createCanvases(canvasRefObj, sequencerLengthPx));
  }, []);

  useEffect(
    //Add additional canvases when sequencer length increases
    function () {
      const canvasesNeeded = Math.ceil(sequencerLengthPx / 10000);
      if (canvasesNeeded > canvases.length) {
        setCanvases((state) => {
          const newCanvases = createCanvases(
            canvasRefObj,
            state.length * 10000,
            canvasesNeeded * 10000
          );
          const newState = [...state, ...newCanvases];
          return newState;
        });
      }
    },
    [sequencerLengthPx]
  );

  return (
    <div className="BarNumbers" ref={componentRef}>
      {canvases}
    </div>
  );
}
