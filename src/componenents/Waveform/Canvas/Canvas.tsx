import React, { useRef, useEffect, useState } from "react";
import "./Canvas.scss";
import WaveformData from "waveform-data";
import {
  generateWaveform,
  createCanvases,
  CanvasRefObj,
} from "../../../utils/canvas";

export default function Canvas({ waveform }: { waveform: WaveformData }) {
  const [canvases, setCanvases] = useState<JSX.Element[]>([]);
  const componentRef = useRef<HTMLDivElement>(null);

  const canvasRefs = useRef<CanvasRefObj>({});

  //Generates waveform for each canvas using the refs
  function generateWaveforms(refs: React.MutableRefObject<CanvasRefObj>): void {
    const size = Object.keys(refs.current).length;
    let position = 0;
    for (let i = 0; i < size; i += 1) {
      const canvas = refs.current["_" + i]!;
      generateWaveform(canvas, componentRef, waveform, 0, 1, position, 10000);
      canvas!.style.left = position + "px";
      position += 10000;
    }
  }

  useEffect(function () {
    //Creates required canvas elements and assigns a ref
    setCanvases(createCanvases(canvasRefs, waveform));
    const parent = componentRef.current!;
    const component = componentRef.current!;
    component.style.width = waveform.length + "px";
    component.style.height = parent.offsetHeight + "px";
  }, []);

  useEffect(
    function () {
      generateWaveforms(canvasRefs);
    },
    [canvases]
  );

  return (
    <div className="Canvas" ref={componentRef}>
      {canvases};
    </div>
  );
}
