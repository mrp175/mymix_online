import { useEffect, useState } from "react";
import "./Waveform.scss";
import { useCreateRefs, generateWaveform } from "../../../../utils/canvas";
import { loadAudioFile } from "../../../../utils/loadAudioFile";
import WaveformData from "waveform-data";

export default function Waveform() {
  const [canvasRef, parentRef] = useCreateRefs();
  const [waveform, setWaveform] = useState<WaveformData | null>(null);

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

  return (
    <div className="Waveform" ref={parentRef}>
      <canvas className="Waveform__canvas" ref={canvasRef}></canvas>
    </div>
  );
}
