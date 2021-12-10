export function convertRemToPixels(rem: number): number {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

export function getVariableStyle(varName: string): string {
  const style: CSSStyleDeclaration = getComputedStyle(document.body);
  return style.getPropertyValue(varName);
}
