import { Page } from '@playwright/test';

export class CanvasClickHelper<ButtonMap extends Record<string, { x: number, y: number }>> {
  constructor(private page: Page, private buttonMap: ButtonMap) {}

  async click(key: keyof ButtonMap) {
    const canvas = await this.page.$('canvas');
    if (!canvas) throw new Error('Canvas not found');
    const box = await canvas.boundingBox();
    if (!box) throw new Error('Canvas bounding box not found');
    const { x, y } = this.buttonMap[key];
    await this.page.mouse.click(box.x + x, box.y + y);
  }
}
