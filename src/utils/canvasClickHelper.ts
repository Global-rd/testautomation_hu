import type { Locator, Page } from '@playwright/test';

export class CanvasClickHelper<T extends Record<string, { x: number; y: number }>> {
  constructor(
    private page: Page,
    private canvas: Locator,
    private coords: T
  ) {}

  async click<K extends keyof T & string>(key: K, opts?: { jitter?: number }) {
    const box = await this.canvas.boundingBox();
    if (!box) throw new Error('Canvas is not visible / has no bounding box.');

    const { x, y } = this.coords[key];
    const jitter = opts?.jitter ?? 0;
    const jx = jitter ? (Math.random() * jitter * box.width) : 0;
    const jy = jitter ? (Math.random() * jitter * box.height) : 0;

    const absX = box.x + x * box.width + jx;
    const absY = box.y + y * box.height + jy;
    await this.page.mouse.click(absX, absY);
  }

  validate(): void {
    for (const [k, v] of Object.entries(this.coords)) {
      if (v.x < 0 || v.x > 1 || v.y < 0 || v.y > 1) {
        throw new Error(`Coordinate for '${k}' out of range: ${JSON.stringify(v)}`);
      }
    }
  }
}
