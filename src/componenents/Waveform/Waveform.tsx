import { useEffect, useState, useRef } from "react";
import "./Waveform.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useCreateRefs, generateWaveform } from "../../utils/canvas";
import { loadAudioFile } from "../../utils/loadAudioFile";
import WaveformData from "waveform-data";
import { handleUserInput } from "../../utils/waveformPositioning";
import ZoomedWaveforms from "./ZoomedWaveforms/ZoomedWaveforms";
import HandleWaveformGain from "./HandleWaveformGain/HandleWaveformGain";

export default function Waveform({ id }: { id: string }) {
  const [canvasRef, parentRef] = useCreateRefs();
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

  useEffect(function () {
    loadAudioFile(setWaveform);
    handleUserInput(canvasRef, parentRef, id, zoomLevelRef, dispatch);
  }, []);

  // draw waveform once mouse click is realeased. Prevents too many resamples of the WaveformData object and canvas redraws.
  useEffect(
    function () {
      if (waveform) {
        const canvas = canvasRef.current!;
        const parent = parentRef.current!;
        if (!zoomMouseDown && !gainMouseDown) {
          parent.style.width = "20000px";
          canvas.style.opacity = "1";
          const zoomedWaveform = waveform.resample({ scale: zoomLevel });
          generateWaveform(canvasRef, parentRef, zoomedWaveform, 0, 1, 20000);
        }
        if (zoomMouseDown) {
          canvas.style.opacity = "0";
        }
        if (gainMouseDown) {
          canvas.style.transform = `scaleY(${gain})`;
        }
      }
    },
    [waveform, zoomMouseDown, zoomLevel, gain, gainMouseDown]
  );

  useEffect(
    function () {
      parentRef.current!.style.left = position + "px";
    },
    [position]
  );

  useEffect(
    function () {
      zoomLevelRef.current = zoomLevel;
    },
    [zoomLevel]
  );

  return (
    <div className="Waveform" ref={parentRef}>
      <canvas className="Waveform__canvas" ref={canvasRef}></canvas>
      <ZoomedWaveforms
        parentRef={parentRef}
        waveform={waveform ? waveform : null}
        id="1"
      />
      <HandleWaveformGain canvasRef={canvasRef} waveform={waveform} id="1" />
    </div>
  );
}
