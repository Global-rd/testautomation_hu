import { Page } from "@playwright/test";

export class CanvasClickHelper<T extends Record<string, { x: number; y: number }>> {
  constructor(private page: Page, private buttonMap: T) {}

  async clickButton(button: keyof T, canvasCenter: { x: number; y: number }) {
    const coords = this.buttonMap[button];
    if (!coords) throw new Error(`Invalid button: ${String(button)}`);

    const clickX = canvasCenter.x + coords.x;
    const clickY = canvasCenter.y + coords.y;

    await this.page.mouse.click(clickX, clickY);
  }
}