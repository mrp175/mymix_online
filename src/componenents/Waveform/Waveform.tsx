import { useEffect, useState, useRef } from "react";
import "./Waveform.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { generateWaveform, pixelsPerBar } from "../../utils/canvas";
import { loadAudioFile } from "../../utils/loadAudioFile";
import WaveformData from "waveform-data";
import WaveformPositioning from "./WaveformPositioning/WaveformPositioning";
import HandleZoom from "./HandleZoom/HandleZoom";

export default function Waveform({ id }: { id: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const componentRef = useRef<HTMLDivElement>(null);

  const [waveform, setWaveform] = useState<WaveformData | null>(null);

  const { position, gain, startOffset } = useAppSelector(
    (state) => state.waveformStates[id]
  );
  const { zoomLevel } = useAppSelector((state) => state.zoomLevel);
  const zoomMouseDown = useAppSelector((state) => state.zoomLevel.mouseDown);

  const zoomLevelRef = useRef(zoomLevel);
  const dispatch = useAppDispatch();
  let pixels_per_bar = pixelsPerBar(174, zoomLevel);

  // Load audio file and handle user input to move waveforms along the sequencer
  useEffect(function () {
    loadAudioFile(setWaveform);
    // handleUserInput(canvasRef, componentRef, id, zoomLevelRef, dispatch);
  }, []);

  useEffect(
    function () {
      if (waveform) {
        const canvas = canvasRef.current!;
        const parent = componentRef.current!;
        // draw waveform only after zoom level is no longer being changed and click has been released. Prevents too many resamples of the WaveformData object and canvas redraws.
        if (!zoomMouseDown) {
          parent.style.width = waveform.length + "px";
          canvas.style.opacity = "0";
          const zoomedWaveform = waveform.resample({ scale: zoomLevel });
          generateWaveform(
            canvasRef,
            componentRef,
            zoomedWaveform,
            0,
            1,
            0,
            10000
          );
        }
        //Hide waveform if zoom level is currently being changed. Displays ZoomedWaveforms component instead.
        if (zoomMouseDown) {
          canvas.style.opacity = "0";
        }
      }
    },
    [waveform, zoomMouseDown, zoomLevel]
  );

  //scale waveform vertically to visually display changes in gain
  useEffect(
    function () {
      const canvas = canvasRef.current!;
      canvas.style.transform = `scaleY(${gain})`;
    },
    [gain]
  );

  //Positions waveform at correct bar when changing zoom.
  useEffect(
    function () {
      componentRef.current!.style.left = position * pixels_per_bar + "px";
    },
    [position, zoomLevel]
  );

  //Positions waveform at correct start offset position when changing zoom
  useEffect(
    function () {
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
        {waveform ? (
          <HandleZoom
            waveform={waveform}
            parentRef={componentRef}
            trackId="1"
          />
        ) : null}
        <WaveformPositioning parentRef={componentRef} />
      </div>
    </div>
  );
}
