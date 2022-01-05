import { useEffect, useState, useRef } from "react";
import "./ZoomedWaveforms.scss";
import { useCreateNullRefs } from "../../../utils/utils";
import { useAppSelector } from "../../../redux/hooks";
import WaveformData from "waveform-data";
import { calculateScaleX, generateWaveform } from "../../../utils/canvas";
import { minimumZoomLevel } from "../../../constants/constants";

export default function ZoomedWaveforms({
  waveform,
  parentRef,
  id,
}: {
  waveform: WaveformData | null;
  parentRef: React.RefObject<HTMLDivElement>;
  id: string;
}) {
  const { mouseDown, zoomLevel } = useAppSelector((state) => state.zoomLevel);
  const { gain } = useAppSelector((state) => state.waveformStates[id]);
  const [scalingFactor, setScalingFactor] = useState(128);
  let type = document.createElement("canvas");

  function createZoomLevelRefStrings() {
    const result = [];
    let i = minimumZoomLevel;
    do {
      result.push("_" + i);
      i *= 2;
    } while (i < 35000);
    return result;
  }

  const zoomLevels = createZoomLevelRefStrings();

  const waveformRefs = useCreateNullRefs(zoomLevels, type);
  const componentRef = useRef<HTMLDivElement>(null);

  function zoomWaveform(
    canvas: HTMLCanvasElement,
    scaleAmount: number,
    gain: number
  ): void {
    canvas.style.transformOrigin = "0 0";
    canvas.style.opacity = "0";
    canvas.style.transform = `scaleX(${1 / scaleAmount})`;
  }

  function generateWaveforms(waveformRefs: {
    [key: string]: React.RefObject<HTMLCanvasElement>;
  }): void {
    for (let refKey in waveformRefs) {
      const canvasRef = waveformRefs[refKey];
      const scale = +refKey.substring(1);
      if (waveform) {
        const newWaveform = waveform.resample({ scale });
        generateWaveform(canvasRef, parentRef, newWaveform, 0, 1, 20000);
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
        const scaledZoomLevel = zoomLevel;
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
          zoomWaveform(currentCanvas, scaledZoom, gain);
        }

        if (!mouseDown) {
          currentCanvas.style.opacity = "0";
        }
      }
    },
    [zoomLevel, mouseDown, waveform]
  );

  useEffect(
    function () {
      const parent = parentRef.current!;
      const component = componentRef.current!;
      component.style.height = parent.offsetHeight + "px";
      component.style.transform = `scaleY(${gain})`;
    },
    [gain]
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

  return (
    <div className="ZoomedWaveforms" ref={componentRef}>
      {canvases}
    </div>
  );
}
