import type { Page } from "@playwright/test";
import type { ButtonMap } from "./types";

export class CanvasButtonInteractor<TButton extends string> {
  constructor(
    private page: Page,
    private canvasCenter: { x: number; y: number },
    private canvasDimensions: { width: number; height: number },
    private buttonMap: ButtonMap<TButton>
  ) {}
    // Gomb megnyomásának szimulálása a vásznon
  async triggerButton(button: TButton) {
    const buttonCoords = this.buttonMap[button];
    const canvas = this.page.locator("canvas");
    await canvas.scrollIntoViewIfNeeded();

    const canvasBox = await canvas.boundingBox();
    if (!canvasBox) throw new Error("Canvas not visible");

    const { w, h } = await canvas.evaluate((c: HTMLCanvasElement) => ({
      w: c.width,
      h: c.height,
    }));
    // A vászon és a megjelenített méretek közötti arány kiszámítása
    const relativeX = (buttonCoords.x * canvasBox.width) / w;
    const relativeY = (buttonCoords.y * canvasBox.height) / h;

    await this.page.mouse.click(canvasBox.x + relativeX, canvasBox.y + relativeY);
    await this.page.waitForTimeout(150);
  }
}
