export class CanvasClickHelper<T extends string | number> {
  public keyCoordinates: Record<T, { x: number; y: number }>;

  constructor(keyCoordinates: Record<T, { x: number; y: number }>) {
    this.keyCoordinates = keyCoordinates;
  }

  getButton(button: T) {
    return this.keyCoordinates[button];
  }
}
