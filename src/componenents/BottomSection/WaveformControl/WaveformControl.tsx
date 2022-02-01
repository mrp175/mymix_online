import "./WaveformControl.scss";
import Dial from "../../Dial/Dial";
import VolumeSlider from "../../VolumeSlider/VolumeSlider";
import { useAppDispatch } from "../../../redux/hooks";
import { setGain } from "../../../redux/slices/waveformStateSlice";

export default function WaveformControl() {
  const dispatch = useAppDispatch();
  function changeVolume(value: number): void {
    dispatch(setGain({ id: "1", value }));
  }
  return (
    <div className="WaveformControl">
      <Dial
        min={0}
        max={100}
        step={1}
        init={50}
        log={0}
        logType="log"
        dbType="linear"
        waveformId="1"
      />
      <VolumeSlider
        style={{ mainAxisLength: 10, crossAxisLength: 1 }}
        min={0}
        max={2}
        init={1}
        onChange={(val) => {
          changeVolume(val);
        }}
        id="1"
      />
    </div>
  );
}

// root bpm
// gain / volume
// pan
// start offset
// Name
