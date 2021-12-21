import { useEffect, useState, useRef } from "react";
import "./Waveform.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  useCreateRefs,
  generateWaveform,
  generateInitialWaveform,
  setScaleX,
} from "../../utils/canvas";
import { loadAudioFile } from "../../utils/loadAudioFile";
import WaveformData from "waveform-data";
import { handleUserInput } from "../../utils/waveformPositioning";

export default function Waveform({ id }: { id: string }) {
  const [canvasRef, parentRef] = useCreateRefs();
  const initialWaveformCanvasRef = useRef<HTMLCanvasElement>(null);
  const [waveform, setWaveform] = useState<WaveformData | null>(null);
  const [scalingFactor, setScalingFactor] = useState(1);
  const { position, gain, startOffset } = useAppSelector(
    (state) => state.waveformStates["1"]
  );
  const { zoomLevel, mouseDown } = useAppSelector((state) => state.zoomLevel);
  const dispatch = useAppDispatch();

  useEffect(function () {
    loadAudioFile(setWaveform);
    handleUserInput(canvasRef, parentRef, "1", dispatch);
  }, []);

  useEffect(
    function () {
      if (waveform) {
        if (!mouseDown) {
          const canvas = canvasRef.current!;
          const zoomableCanvas = initialWaveformCanvasRef.current!;
          canvas.style.opacity = "1";
          zoomableCanvas.style.opacity = "0";
          const zoomedWaveform = waveform.resample({ scale: zoomLevel });
          generateWaveform(canvasRef, parentRef, zoomedWaveform, 0, gain, 2000);
        }
      }
    },
    [waveform, gain, mouseDown, zoomLevel]
  );

  useEffect(
    function () {
      if (waveform) {
        generateInitialWaveform(initialWaveformCanvasRef, parentRef, waveform);
      }
    },
    [waveform]
  );

  useEffect(
    function () {
      if (waveform) {
        if (mouseDown) {
          const canvas = canvasRef.current!;
          const zoomableCanvas = initialWaveformCanvasRef.current!;
          zoomableCanvas.style.transformOrigin = "0 0";
          canvas.style.opacity = "0";
          zoomableCanvas.style.opacity = "1";
          const scaledZoomLevel = zoomLevel / 128;
          const scaledZoom = setScaleX(scaledZoomLevel);
          const currentScalingFactor = scaledZoomLevel / scaledZoom;
          if (scalingFactor !== currentScalingFactor) {
            setScalingFactor(currentScalingFactor);
            const zoomedWaveform = waveform.resample({
              scale: currentScalingFactor * 128,
            });
            generateWaveform(
              initialWaveformCanvasRef,
              parentRef,
              zoomedWaveform,
              0,
              gain,
              2000
            );
          }
          zoomableCanvas.style.transform = `scaleX(${1 / scaledZoom})`;
        }
      }
    },
    [zoomLevel, mouseDown, waveform]
  );

  useEffect(
    function () {
      parentRef.current!.style.left = position + "px";
    },
    [position]
  );

  return (
    <div className="Waveform" ref={parentRef}>
      <canvas className="Waveform__canvas" ref={canvasRef}></canvas>
      <canvas
        className="Waveform__initial-waveform"
        ref={initialWaveformCanvasRef}
      ></canvas>
    </div>
  );
}
