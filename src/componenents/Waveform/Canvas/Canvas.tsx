import React, { useRef, useEffect, useState } from "react";
import "./Canvas.scss";
import WaveformData from "waveform-data";
import { generateWaveform2 } from "../../../utils/canvas";

export default function Canvas({ waveform }: { waveform: WaveformData }) {
  const componentRef = useRef<HTMLDivElement>(null);
  interface CanvasRefObj {
    [key: string]: HTMLCanvasElement | null;
  }

  const canvasRefs = useRef<CanvasRefObj>({});

  //Creates required canvas elements and assigns a ref
  function createCanvases(waveform: WaveformData): JSX.Element[] {
    let html: JSX.Element[] = [];
    let i = 0;
    let length = 0;
    do {
      const string = "_" + i;
      const canvas = (
        <canvas
          key={string}
          ref={(element) => (canvasRefs.current[string] = element)}
          className="canvas"
        ></canvas>
      );
      html.push(canvas);
      i += 1;
      length += 10000;
    } while (length < waveform.length);
    return html;
  }

  const canvases = createCanvases(waveform);

  //Generates waveform for each canvas using the refs
  function generateWaveforms(refs: React.MutableRefObject<CanvasRefObj>): void {
    const size = Object.keys(refs.current).length;
    let position = 0;
    for (let i = 0; i < size; i += 1) {
      const canvas = refs.current["_" + i]!;
      generateWaveform2(canvas, componentRef, waveform, 0, 1, position, 10000);
      canvas!.style.left = position + "px";
      position += 10000;
    }
  }

  useEffect(function () {
    const parent = componentRef.current!;
    const component = componentRef.current!;
    component.style.width = waveform.length + "px";
    component.style.height = parent.offsetHeight + "px";
    generateWaveforms(canvasRefs);
  }, []);

  return (
    <div className="Canvas" ref={componentRef}>
      {canvases};
    </div>
  );
}
