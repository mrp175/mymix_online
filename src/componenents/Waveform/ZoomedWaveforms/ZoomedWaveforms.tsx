import { useEffect, useState, useRef } from "react";
import "./ZoomedWaveforms.scss";
import { useCreateNullRefs } from "../../../utils/utils";
import { useAppSelector } from "../../../redux/hooks";
import WaveformData from "waveform-data";
import { calculateScaleX, generateWaveform } from "../../../utils/canvas";

export default function ZoomedWaveforms({
  waveform,
  parentRef,
}: {
  waveform: WaveformData | null;
  parentRef: React.RefObject<HTMLDivElement>;
}) {
  const { mouseDown, zoomLevel } = useAppSelector((state) => state.zoomLevel);
  const [scalingFactor, setScalingFactor] = useState(1);
  const [newWaveform, setNewWaveform] = useState<WaveformData | null>(null);
  let type = document.createElement("canvas");
  const waveformRefs = useCreateNullRefs(
    ["_1", "_2", "_4", "_8", "_16", "_32", "_64", "_128", "_256"],
    type
  );

  function zoomWaveform(canvas: HTMLCanvasElement, scaleAmount: number): void {
    canvas.style.transformOrigin = "0 0";
    canvas.style.opacity = "1";
    canvas.style.transform = `scaleX(${1 / scaleAmount})`;
  }

  function generateWaveforms(waveformRefs: {
    [key: string]: React.RefObject<HTMLCanvasElement>;
  }): void {
    for (let refKey in waveformRefs) {
      const canvasRef = waveformRefs[refKey];
      const scale = +refKey.substring(1) * 128;
      if (waveform) {
        const newWaveform = waveform.resample({ scale });
        generateWaveform(canvasRef, parentRef, newWaveform, 0, 1, 2000);
      }
    }
  }

  useEffect(
    function () {
      generateWaveforms(waveformRefs);
    },
    [waveform]
  );

  useEffect(
    function () {
      if (waveform) {
        const scaledZoomLevel = zoomLevel / 128;
        const scaledZoom = calculateScaleX(scaledZoomLevel);
        const currentScalingFactor = scaledZoomLevel / scaledZoom;

        const currentCanvas: HTMLCanvasElement =
          waveformRefs[`_${currentScalingFactor}`].current!;
        const parent = parentRef.current!;
        if (mouseDown) {
          if (scalingFactor !== currentScalingFactor) {
            const oldCanvas: HTMLCanvasElement =
              waveformRefs[`_${scalingFactor}`].current!;
            oldCanvas.style.opacity = "0";
            setScalingFactor(currentScalingFactor);
          }
          zoomWaveform(currentCanvas, scaledZoom);
        }

        if (!mouseDown) {
          currentCanvas.style.opacity = "0";
        }
      }
    },
    [zoomLevel, mouseDown, waveform]
  );

  function createCanvasElements(refs: {
    [key: string]: React.RefObject<HTMLCanvasElement>;
  }): JSX.Element[] {
    const html: JSX.Element[] = [];
    for (let key in waveformRefs) {
      html.push(
        <canvas
          className="ZoomedWaveforms__canvas"
          ref={waveformRefs[key]}
        ></canvas>
      );
    }
    return html;
  }

  const canvases = createCanvasElements(waveformRefs);

  return <div className="ZoomedWaveforms">{canvases}</div>;
}
