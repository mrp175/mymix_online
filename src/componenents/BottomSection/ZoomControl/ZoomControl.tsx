import React from "react";
import "./ZoomControl.scss";
import { useAppDispatch } from "../../../redux/hooks";
import { setZoomLevel } from "../../../redux/slices/zoomLevelSlice";

export default function ZoomControl() {
  const dispatch = useAppDispatch();
  return (
    <div className="ZoomControl">
      <input
        className="zoom-slider"
        type="range"
        min="128"
        max="40000"
        step="1"
        onChange={(e) => dispatch(setZoomLevel(+e.target.value))}
      ></input>
    </div>
  );
}
