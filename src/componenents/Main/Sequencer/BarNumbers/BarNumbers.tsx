import { useState, useEffect, useRef } from "react";
import "./BarNumbers.scss";
import { useAppSelector } from "../../../../redux/hooks";
import {
  createCanvases,
  CanvasRefObj,
  calculateSequencerLengthPx,
  drawBarNumbers,
} from "../../../../utils/canvas";

export default function BarNumbers() {
  const [canvases, setCanvases] = useState<JSX.Element[]>([]);
  const componentRef = useRef<HTMLDivElement>(null);
  const canvasRefObj = useRef<CanvasRefObj>({});
  const { zoomLevel, mouseDown } = useAppSelector((state) => state.zoomLevel);
  const scrollPosition = useAppSelector((state) => state.scrollPosition);
  const sequencerLengthBars = useAppSelector(
    (state) => state.sequencerLength.length
  );
  let sequencerLengthPx = calculateSequencerLengthPx(
    sequencerLengthBars,
    174,
    zoomLevel
  );

  sequencerLengthPx *= 5;

  // Create required canvases based on sequencer length
  useEffect(function () {
    setCanvases(createCanvases(canvasRefObj, 0, 0, "BarNumbers__canvas"));
  }, []);

  useEffect(
    //Add additional canvases when sequencer length increases
    function () {
      const canvasesNeeded = Math.ceil(sequencerLengthPx / 10000);
      if (canvasesNeeded > canvases.length) {
        setCanvases((state) => {
          const newCanvases = createCanvases(
            canvasRefObj,
            canvasesNeeded * 10000,
            state.length * 10000,
            "BarNumbers__canvas"
          );
          const newState = [...state, ...newCanvases];
          return newState;
        });
      }
    },
    [sequencerLengthPx]
  );

  useEffect(
    function () {
      const component = componentRef.current;
      if (component) {
        drawBarNumbers(canvasRefObj, component, sequencerLengthPx, zoomLevel);
      }
    },
    [zoomLevel, canvases, mouseDown]
  );

  return (
    <div className="BarNumbers" ref={componentRef}>
      {canvases}
    </div>
  );
}
