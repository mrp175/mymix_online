import { useEffect, useState } from "react";
import "./Waveform.scss";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { useCreateRefs, generateWaveform } from "../../../../utils/canvas";
import { loadAudioFile } from "../../../../utils/loadAudioFile";
import WaveformData from "waveform-data";
import { handleUserInput } from "../../../../utils/userInputs";

export default function Waveform({ id }: { id: string }) {
  const [canvasRef, parentRef] = useCreateRefs();
  const [waveform, setWaveform] = useState<WaveformData | null>(null);
  const { position } = useAppSelector((state) => state.waveformStates["1"]);
  const dispatch = useAppDispatch();

  useEffect(function () {
    loadAudioFile(setWaveform);
    handleUserInput(canvasRef, parentRef, "1", dispatch);
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
