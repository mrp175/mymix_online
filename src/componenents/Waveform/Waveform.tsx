import { useEffect, useState } from "react";
import "./Waveform.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useCreateRefs, generateWaveform } from "../../utils/canvas";
import { loadAudioFile } from "../../utils/loadAudioFile";
import WaveformData from "waveform-data";
import { handleUserInput } from "../../utils/waveformPositioning";

export default function Waveform({ id }: { id: string }) {
  const [canvasRef, parentRef] = useCreateRefs();
  const [waveform, setWaveform] = useState<WaveformData | null>(null);
  const { position, gain, startOffset } = useAppSelector(
    (state) => state.waveformStates["1"]
  );
  const { zoomLevel } = useAppSelector((state) => state.zoomLevel);
  const dispatch = useAppDispatch();

  useEffect(function () {
    loadAudioFile(setWaveform);
    handleUserInput(canvasRef, parentRef, "1", dispatch);
  }, []);

  useEffect(
    function () {
      if (waveform) {
        const zoomedWaveform = waveform.resample({ scale: zoomLevel });
        // const zoomedWaveform = waveform.resample({ width: zoomLevel });
        console.log(zoomedWaveform.pixels_per_second);
        // console.log(waveform.duration);
        // console.log(waveform.scale);
        console.log(zoomedWaveform.seconds_per_pixel);
        // console.log(waveform.length / (44100 / 128));
        generateWaveform(canvasRef, parentRef, zoomedWaveform, 0, gain);
      }
    },
    [waveform, zoomLevel, gain]
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
    </div>
  );
}
