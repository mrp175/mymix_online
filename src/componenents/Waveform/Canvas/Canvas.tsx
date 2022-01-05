import React, { useRef, useEffect, useState } from "react";
import "./Canvas.scss";
import WaveformData from "waveform-data";
import { generateWaveform2 } from "../../../utils/canvas";

export default function Canvas({
  waveform,
  parentRef,
}: {
  waveform: WaveformData;
  parentRef: React.RefObject<HTMLDivElement>;
}) {
  interface canvasObj {
    [key: string]: HTMLCanvasElement | null;
  }

  const canvasRefs = useRef<canvasObj>({});

  function createCanvases(waveform: WaveformData): JSX.Element[] {
    let html: JSX.Element[] = [];
    let i = 0;
    let length = 0;
    do {
      const string = "_" + i;
      const canvas = (
        <canvas
          key={i}
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

  function generateWaveforms(canvasObj: canvasObj): void {
    let i = 0;
    for (let canvas in canvasObj) {
      generateWaveform2(
        canvasObj[canvas] as HTMLCanvasElement,
        parentRef,
        waveform,
        0,
        1,
        i,
        10000
      );
      canvasObj[canvas]!.style.left = i + "px";
      i += 10000;
    }
  }

  useEffect(function () {
    generateWaveforms(canvasRefs.current);
  }, []);

  return <div className="Canvas">{createCanvases(waveform)};</div>;
}
