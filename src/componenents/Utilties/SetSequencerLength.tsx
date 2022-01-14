import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setRequiredLength } from "../../redux/slices/sequencerLengthSlice";
import { pixelsPerBar } from "../../utils/canvas";

export default function SetSequencerLength() {
  const { pxLeft, pxRight } = useAppSelector((state) => state.scrollPosition);
  const { zoomLevel } = useAppSelector((state) => state.zoomLevel);
  let sequencerLengthBars = useAppSelector(
    (state) => state.sequencerLength.lengthBars
  );
  const dispatch = useAppDispatch();

  useEffect(
    // Sets required sequencer length to the width of the window if sequencerLengthBars is less than thiss
    function () {
      const sequencerWidthPx = pxRight - pxLeft;
      const sequencerWidthBars =
        sequencerWidthPx / pixelsPerBar(174, zoomLevel);
      if (sequencerLengthBars < sequencerWidthBars) {
        sequencerLengthBars = sequencerWidthBars;
      }
      dispatch(setRequiredLength({ value: sequencerLengthBars }));
    },
    [zoomLevel, sequencerLengthBars]
  );
  return null;
}
