/// <reference types="cypress" />

export type NormalizedCoord = { nx: number; ny: number };

export class CanvasClickHelper<TMap extends Record<string, NormalizedCoord>> {
  constructor(
    private readonly canvasSelector: string,
    private readonly map: TMap
  ) {}

  click<K extends keyof TMap & string>(key: K) {
    const coords = this.map[key];
    if (!coords) throw new Error(`Unknown key ${key}`);

    cy.get(this.canvasSelector).then(($canvas) => {
      const rect = $canvas[0].getBoundingClientRect();
      const x = rect.left + coords.nx * rect.width;
      const y = rect.top + coords.ny * rect.height;
      cy.wrap($canvas).click(x - rect.left, y - rect.top);
    });
  }
}