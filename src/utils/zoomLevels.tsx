import { WaveformData } from "waveform-data";
import Canvas from "../componenents/Waveform/Canvas/Canvas";
import { minimumZoomLevel } from "../constants/constants";

export interface RefObject {
  [key: string]: HTMLDivElement | null;
}

//Creates required Canvas components at correct zoom levels assigns a ref to each
export function createZoomLevelElements(
  waveform: WaveformData,
  refObject: React.MutableRefObject<RefObject>
): JSX.Element[] {
  let html: JSX.Element[] = [];
  let i = minimumZoomLevel;
  do {
    const zoomedWaveform = waveform.resample({ scale: i });
    const string = "_" + i;
    const div = (
      <div
        key={string}
        ref={(element) => (refObject.current[string] = element)}
        className="div__zoom-level"
      >
        <Canvas waveform={zoomedWaveform} />
      </div>
    );
    html.push(div);
    i *= 2;
  } while (i < 35000);
  return html;
}

export function scaleX(canvas: HTMLDivElement, scaleAmount: number): void {
  canvas.style.transformOrigin = "0 0";
  canvas.style.transform = `scaleX(${1 / scaleAmount})`;
}
