import { useRef } from "react";

export function convertRemToPixels(rem: number): number {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

export function convertPixelsToRem(pixels: number): number {
  return (
    pixels / parseFloat(getComputedStyle(document.documentElement).fontSize)
  );
}

export function getVariableStyle(varName: string): string {
  const style: CSSStyleDeclaration = getComputedStyle(document.body);
  return style.getPropertyValue(varName);
}

export function amplitudeToDecibels(amplitude: number): number {
  return (20 * Math.log(amplitude)) / Math.LN10;
}

export function decibelsToAmplitude(decibels: number): number {
  return Math.pow(10, decibels / 20);
}

export function handleRangeBias(
  x: number,
  bias: number,
  type: "exp" | "log"
): number {
  if (type === "exp") {
    x = 1 - x;
    let k = Math.pow(1 - bias, 3);
    k = (x * k) / (x * k - x + 1);
    return 1 - k;
  } else {
    let k = Math.pow(1 - bias, 3);
    k = (x * k) / (x * k - x + 1);
    return k;
  }
}

export function mapNumberRange(
  val: number,
  in_min: number,
  in_max: number,
  out_min: number,
  out_max: number
) {
  return ((val - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
}

export function useCreateNullRefs<T>(
  refNames: string[],
  type: T
): {
  [key: string]: React.RefObject<T>;
} {
  let refs: { [key: string]: React.RefObject<T> } = {};
  for (let i = 0; i < refNames.length; i += 1) {
    refs[`${refNames[i]}`] = useRef<T>(null);
  }
  return refs;
}

export function addGenericEventListener(
  ref: HTMLDivElement | (Window & typeof globalThis),
  type: string,
  callback: any //Fix this once you figure out why it doesn't allow (e: MouseEvent) => void as a type here. It's is convinced it is an EventListenerOrEventListenerObject which is not compatible with MouseEvent
): () => void {
  ref.addEventListener(type, callback);
  return function () {
    ref.removeEventListener(type, callback);
  };
}
