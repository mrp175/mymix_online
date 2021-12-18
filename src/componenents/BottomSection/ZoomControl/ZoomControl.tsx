import React from "react";
import "./ZoomControl.scss";
import { useAppDispatch } from "../../../redux/hooks";
import { setZoomLevel } from "../../../redux/slices/zoomLevelSlice";
import ZoomSlider from "../../ZoomSlider/ZoomSlider";

export default function ZoomControl() {
  const dispatch = useAppDispatch();
  function changeZoomLevel(value: number): void {
    dispatch(setZoomLevel(value));
  }
  return (
    <div className="ZoomControl">
      {/* <input
        className="zoom-slider"
        type="range"
        min="128"
        max="40000"
        step="1"
        onChange={(e) => dispatch(setZoomLevel(+e.target.value))}
      ></input> */}

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
