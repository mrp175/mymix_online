import { useEffect, useState, useRef } from "react";
import "./Waveform.scss";
import { useAppSelector } from "../../redux/hooks";
import { pixelsPerBar } from "../../utils/canvas";
import { loadAudioFile } from "../../utils/loadAudioFile";
import WaveformData from "waveform-data";
import HandleDrag from "./HandleDrag/HandleDrag";
import HandleZoom from "./HandleZoom/HandleZoom";

export default function Waveform({ id }: { id: string }) {
  const parentRef = useRef<HTMLDivElement>(null);
  const componentRef = useRef<HTMLDivElement>(null);

  const [waveform, setWaveform] = useState<WaveformData | null>(null);

  const { position, startOffset } = useAppSelector(
    (state) => state.waveformStates[id]
  );
  const { zoomLevel } = useAppSelector((state) => state.zoomLevel);

  const zoomLevelRef = useRef(zoomLevel);
  let pixels_per_bar = pixelsPerBar(174, zoomLevel);

  // Load audio file and handle user input to move waveforms along the sequencer
  useEffect(function () {
    loadAudioFile(setWaveform);
  }, []);

  useEffect(
    function () {
      if (waveform) {
        const length = waveform.resample({ scale: zoomLevel }).length;
        const parent = componentRef.current!;
        parent.style.width = length + "px";
      }
    },
    [zoomLevel]
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
        {waveform ? (
          <HandleZoom
            waveform={waveform}
            parentRef={componentRef}
            trackId="1"
          />
        ) : null}
        <HandleDrag parentRef={componentRef} />
      </div>
    </div>
  );
}
