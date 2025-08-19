import type { Locator, Page } from '@playwright/test';

/** Normalizált (0..1) koordináta a canvas méretéhez képest */
export type NormalizedCoord = { nx: number; ny: number };

/** T típus: gombnév -> normalizált koordináta */
export class CanvasClickHelper<TMap extends Record<string, NormalizedCoord>> {
  constructor(
    private readonly page: Page,
    private readonly canvas: Locator,
    private readonly map: TMap
  ) {}

  async click<K extends keyof TMap & string>(key: K): Promise<void> {
    const coords = this.map[key];
    if (!coords) throw new Error(`Unknown key "${key as string}"`);

    const box = await this.canvas.boundingBox();
    if (!box) throw new Error('Canvas bounding box not available');

    const x = box.x + coords.nx * box.width;
    const y = box.y + coords.ny * box.height;

    await this.page.mouse.click(x, y, { button: 'left' });
  }
}