import "./ZoomControl.scss";
import { useAppDispatch } from "../../../redux/hooks";
import { setZoomLevel } from "../../../redux/slices/zoomLevelSlice";
import { handleRangeBias, mapNumberRange } from "../../../utils/utils";
import ZoomSlider from "../../ZoomSlider/ZoomSlider";
import { minimumZoomLevel } from "../../../constants/constants";

export default function ZoomControl() {
  const dispatch = useAppDispatch();
  const min = 0;
  const max = 1;
  function changeZoomLevel(value: number): void {
    let mappedValue: number = handleRangeBias(value, 0.7, "log")!;
    mappedValue = mapNumberRange(
      mappedValue,
      min,
      max,
      minimumZoomLevel,
      40000
    );
    dispatch(setZoomLevel(mappedValue));
  }
  return (
    <div className="ZoomControl">
      <ZoomSlider
        init={0.3}
        max={1}
        min={0}
        style={{ mainAxisLength: 15, crossAxisLength: 2 }}
        onChange={changeZoomLevel}
      />
    </div>
  );
}
