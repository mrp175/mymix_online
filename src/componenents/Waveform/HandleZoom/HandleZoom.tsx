import { useState, useRef, useEffect } from "react";
import "./HandleZoom.scss";
import WaveformData from "waveform-data";
import { useAppSelector } from "../../../redux/hooks";
import {
  RefObject,
  createZoomLevelElements,
  scaleX,
} from "../../../utils/zoomLevels";
import { calculateScaleX } from "../../../utils/canvas";

interface Params {
  waveform: WaveformData;
  parentRef: React.RefObject<HTMLDivElement>;
  trackId: string;
}

export default function HandleZoom({ waveform, parentRef, trackId }: Params) {
  const [scalingFactor, setScalingFactor] = useState(128);
  const { zoomLevel } = useAppSelector((state) => state.zoomLevel);
  const { gain } = useAppSelector((state) => state.waveformStates[trackId]);
  const [html, setHtml] = useState<JSX.Element[]>([]);

  const componentRef = useRef<HTMLDivElement>(null);
  const zoomLevelRefs = useRef<RefObject>({});

  useEffect(function () {
    const component = componentRef.current!;
    component.style.height = parentRef.current?.offsetHeight + "px";
    setHtml(createZoomLevelElements(waveform, zoomLevelRefs));
  }, []);

  //Display current waveform and scale horizontally to match zoom level
  useEffect(
    function () {
      if (zoomLevelRefs.current["_128"]) {
        const intermediateZoomScale = calculateScaleX(zoomLevel);
        const currentScalingFactor = zoomLevel / intermediateZoomScale;
        const currentWaveform =
          zoomLevelRefs.current[`_${currentScalingFactor}`]!;
        currentWaveform.style.opacity = "1";
        if (scalingFactor !== currentScalingFactor) {
          const previousWaveform = zoomLevelRefs.current[`_${scalingFactor}`]!;
          previousWaveform.style.opacity = "0";
          setScalingFactor(currentScalingFactor);
        }
        scaleX(currentWaveform, intermediateZoomScale);
      }
    },
    [zoomLevel]
  );

  useEffect(
    function () {
      const component = componentRef.current!;
      component.style.transform = `scaleY(${gain})`;
    },
    [gain]
  );

  return (
    <div className="HandleZoom" ref={componentRef}>
      {html}
    </div>
  );
}
