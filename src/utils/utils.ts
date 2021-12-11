export function convertRemToPixels(rem: number): number {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
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
