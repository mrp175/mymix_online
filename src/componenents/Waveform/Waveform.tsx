import { useEffect, useState, useRef } from "react";
import "./Waveform.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useCreateRefs, generateWaveform } from "../../utils/canvas";
import { loadAudioFile } from "../../utils/loadAudioFile";
import WaveformData from "waveform-data";
import { handleUserInput } from "../../utils/waveformPositioning";
import ZoomedWaveforms from "./ZoomedWaveforms/ZoomedWaveforms";

export default function Waveform({ id }: { id: string }) {
  const [canvasRef, parentRef] = useCreateRefs();
  const initialWaveformCanvasRef = useRef<HTMLCanvasElement>(null);
  const [waveform, setWaveform] = useState<WaveformData | null>(null);
  const { position, gain, startOffset } = useAppSelector(
    (state) => state.waveformStates["1"]
  );
  const { zoomLevel, mouseDown } = useAppSelector((state) => state.zoomLevel);
  const dispatch = useAppDispatch();

  useEffect(function () {
    loadAudioFile(setWaveform);
    handleUserInput(canvasRef, parentRef, "1", dispatch);
  }, []);

  // draw waveform once mouse click is realeased. Prevents too many resamples of the WaveformData object and canvas redraws.
  useEffect(
    function () {
      if (waveform) {
        const canvas = canvasRef.current!;
        if (!mouseDown) {
          canvas.style.opacity = "1";
          const zoomedWaveform = waveform.resample({ scale: zoomLevel });
          generateWaveform(canvasRef, parentRef, zoomedWaveform, 0, gain, 2000);
        }
        if (mouseDown) {
          canvas.style.opacity = "0";
        }
      }
    },
    [waveform, gain, mouseDown, zoomLevel]
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
      <ZoomedWaveforms
        parentRef={parentRef}
        waveform={waveform ? waveform : null}
      />
    </div>
  );
}
