import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import {
  setBarNumberData,
  setLoaded,
} from "../../../redux/slices/barNumberDataSlice";
import {
  createBarNumberData,
  calculateSequencerLengthPx,
} from "../../../utils/canvas";

export default function BarNumberData() {
  const { zoomLevel } = useAppSelector((state) => state.zoomLevel);
  const barsToBeDisplayed = useAppSelector(
    (state) => state.sequencerLength.requiredLengthBars
  );
  const dispatch = useAppDispatch();

  useEffect(
    function () {
      const sequencerLengthPx = calculateSequencerLengthPx(
        barsToBeDisplayed,
        174,
        zoomLevel
      );
      const barNumberData = createBarNumberData(sequencerLengthPx, zoomLevel);
      dispatch(setBarNumberData(barNumberData));
      dispatch(setLoaded());
    },
    [zoomLevel, barsToBeDisplayed]
  );

  return null;
}
