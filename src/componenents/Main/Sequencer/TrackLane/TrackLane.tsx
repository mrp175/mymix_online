import React, { useRef, useEffect } from "react";
import "./TrackLane.scss";
import { convertRemToPixels } from "../../../../utils/utils";
import { populateCanvas, handleResize } from "../../../../utils/canvas";

export default function TrackLane() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const remScale = 1;
  const textSize = remScale / 1.45; //this is what it will be in rem.
  const barSpacing = 7; // This should scale with zoom.
  const scale = convertRemToPixels(remScale);

  useEffect(function () {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    handleResize(canvas, ctx, parentRef, barSpacing, scale, textSize, true);
    window.addEventListener("resize", () =>
      handleResize(canvas, ctx, parentRef, barSpacing, scale, textSize, true)
    );
    return function () {
      window.removeEventListener("resize", () =>
        handleResize(canvas, ctx, parentRef, barSpacing, scale, textSize, true)
      );
    };
  }, []);

  return (
    <div className="TrackLane" ref={parentRef}>
      <canvas className="TrackLane__canvas" ref={canvasRef}></canvas>
    </div>
  );
}
