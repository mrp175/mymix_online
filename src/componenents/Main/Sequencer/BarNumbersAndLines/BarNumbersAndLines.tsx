import { useState, useEffect, useRef } from "react";
import "./BarNumbersAndLines.scss";
import { useAppSelector } from "../../../../redux/hooks";
import {
  createCanvases,
  CanvasRefObj,
  calculateSequencerLengthPx,
} from "../../../../utils/canvas";
import { BarNumberDataState } from "../../../../redux/slices/barNumberDataSlice";

export default function BarNumbersAndLines({
  componentClassName,
  canvasClassName,
  drawToCanvas,
}: {
  componentClassName: string;
  canvasClassName: string;
  drawToCanvas: (
    refObj: React.MutableRefObject<CanvasRefObj>,
    parentRef: HTMLDivElement,
    barNumberData: BarNumberDataState[][],
    zoomLevel: number
  ) => void;
}) {
  const [canvases, setCanvases] = useState<JSX.Element[]>([]);
  const componentRef = useRef<HTMLDivElement>(null);
  const canvasRefObj = useRef<CanvasRefObj>({});
  const { zoomLevel, mouseDown } = useAppSelector((state) => state.zoomLevel);
  const sequencerLengthBars = useAppSelector(
    (state) => state.sequencerLength.length
  );
  const barNumberData = useAppSelector((state) => state.barNumberData);
  let sequencerLengthPx = calculateSequencerLengthPx(
    sequencerLengthBars,
    174,
    zoomLevel
  );

  // Create required canvases based on sequencer length
  useEffect(function () {
    setCanvases(
      createCanvases(canvasRefObj, sequencerLengthPx, 0, canvasClassName)
    );
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
            canvasClassName
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
        drawToCanvas(canvasRefObj, component, barNumberData.value, zoomLevel);
      }
    },
    [zoomLevel, canvases, mouseDown, barNumberData]
  );

  return (
    <div className={componentClassName} ref={componentRef}>
      {canvases}
    </div>
  );
}
