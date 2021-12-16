import "./WaveformControl.scss";
import Dial from "../../Dial/Dial";

export default function WaveformControl() {
  return (
    <div>
      <Dial
        min={0}
        max={100}
        step={1}
        init={75}
        log={0}
        logType="log"
        dbType="linear"
        waveformId="1"
      />
    </div>
  );
}

// root bpm
// gain / volume
// pan
// start offset
// Name
