import "./HandleWaveformGain.scss";
import { useEffect } from "react";
import WaveformData from "waveform-data";
import { useAppSelector } from "../../../redux/hooks";

export default function HandleWaveformGain({
  waveform,
  canvasRef,
  id,
}: {
  waveform: WaveformData | null;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  id: string;
}) {
  const { gain } = useAppSelector((state) => state.waveformStates[id]);

  useEffect(
    function () {
      const canvas = canvasRef.current!;
      canvas.style.transform = `translateY(${gain})`;
    },
    [gain]
  );
  return <div></div>;
}
