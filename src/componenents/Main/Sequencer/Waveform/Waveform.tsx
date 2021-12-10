import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Waveform.scss";
import { useCreateRefs, generateWaveform } from "../../../../utils/canvas";
import { loadAudioFile } from "../../../../utils/loadAudioFile";
import WaveformData from "waveform-data";

export default function Waveform() {
  const [canvasRef, parentRef] = useCreateRefs();
  const [waveform, setWaveform] = useState<WaveformData | null>(null);
  const { position } = useSelector((state: any) => state.waveformPosition);

  useEffect(function () {
    loadAudioFile(setWaveform);
  }, []);

  useEffect(
    function () {
      if (waveform) {
        generateWaveform(canvasRef, parentRef, waveform);
      }
    },
    [waveform]
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
