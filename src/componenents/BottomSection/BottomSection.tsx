import React from "react";
import "./BottomSection.scss";
import ZoomControl from "./ZoomControl/ZoomControl";
import WaveformControl from "./WaveformControl/WaveformControl";

export default function BottomSection() {
  return (
    <div className="BottomSection">
      <ZoomControl />
      <WaveformControl />
    </div>
  );
}
