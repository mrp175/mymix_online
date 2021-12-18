import "./WaveformControl.scss";
import Dial from "../../Dial/Dial";
import VolumeSlider from "../../VolumeSlider/VolumeSlider";

export default function WaveformControl() {
  function changeVolume(): void {}
  return (
    <div className="WaveformControl">
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
      <VolumeSlider
        style={{ mainAxisLength: 10, crossAxisLength: 1 }}
        min={200}
        max={20000}
        init={75}
        onChange={changeVolume}
      />
    </div>
  );
}

// root bpm
// gain / volume
// pan
// start offset
// Name
