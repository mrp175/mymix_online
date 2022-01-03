import { useEffect, useState, useRef } from "react";
import "./Waveform.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { generateWaveform, pixelsPerBar } from "../../utils/canvas";
import { loadAudioFile } from "../../utils/loadAudioFile";
import WaveformData from "waveform-data";
import { handleUserInput } from "../../utils/waveformPositioning";
import ZoomedWaveforms from "./ZoomedWaveforms/ZoomedWaveforms";

export default function Waveform({ id }: { id: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const componentRef = useRef<HTMLDivElement>(null);
  const [waveform, setWaveform] = useState<WaveformData | null>(null);
  const { position, gain, startOffset } = useAppSelector(
    (state) => state.waveformStates[id]
  );
  const { zoomLevel } = useAppSelector((state) => state.zoomLevel);
  const zoomLevelRef = useRef(zoomLevel);
  const zoomMouseDown = useAppSelector((state) => state.zoomLevel.mouseDown);
  const gainMouseDown = useAppSelector(
    (state) => state.waveformStates[id].mouseDown
  );
  const dispatch = useAppDispatch();
  const [waveformPosition, setWaveformPosition] = useState({
    currentPosition: 0,
    lastPosition: 0,
    mouseDown: false,
  });

  useEffect(function () {
    loadAudioFile(setWaveform);
    handleUserInput(canvasRef, componentRef, id, zoomLevelRef, dispatch);
  }, []);

  // draw waveform once mouse click is realeased. Prevents too many resamples of the WaveformData object and canvas redraws.
  useEffect(
    function () {
      if (waveform) {
        const canvas = canvasRef.current!;
        const parent = componentRef.current!;
        if (!zoomMouseDown) {
          parent.style.width = "20000px";
          canvas.style.opacity = "1";
          const zoomedWaveform = waveform.resample({ scale: zoomLevel });
          generateWaveform(
            canvasRef,
            componentRef,
            zoomedWaveform,
            0,
            1,
            20000
          );
        }
        if (zoomMouseDown) {
          canvas.style.opacity = "0";
        }
      }
    },
    [waveform, zoomMouseDown, zoomLevel]
  );

  useEffect(
    function () {
      const canvas = canvasRef.current!;
      canvas.style.transform = `scaleY(${gain})`;
    },
    [gain]
  );

  useEffect(
    function () {
      const pixels_per_bar = pixelsPerBar(174, zoomLevel);
      componentRef.current!.style.left = position * pixels_per_bar + "px";
    },
    [position, zoomLevel]
  );

  useEffect(
    function () {
      const pixels_per_bar = pixelsPerBar(174, zoomLevel);
      const parent = parentRef.current!;
      parent.style.left = startOffset * pixels_per_bar + "px";
    },
    [zoomLevel, startOffset]
  );

  useEffect(
    function () {
      zoomLevelRef.current = zoomLevel;
    },
    [zoomLevel]
  );

  return (
    <div className="Waveform" ref={componentRef}>
      <div className="Waveform__content-container" ref={parentRef}>
        <canvas className="Waveform__canvas" ref={canvasRef}></canvas>
        <ZoomedWaveforms
          parentRef={componentRef}
          waveform={waveform ? waveform : null}
          id="1"
        />
      </div>
    </div>
  );
}
