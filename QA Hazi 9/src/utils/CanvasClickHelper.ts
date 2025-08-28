import type { Page } from "@playwright/test";
import type { ButtonMap } from "./types";

/**
 * Generikus helper, ami típusosan csak a megadott gombneveket engedi kattintani.
 */
export class CanvasClickHelper<TButton extends string> {
  constructor(
    private page: Page,
    private origin: { x: number; y: number }, // canvas közepe viewportban
    private canvasSize: { width: number; height: number }, // CSS‑független méret (pixel koordináta rendszer)
    private buttons: ButtonMap<TButton>
  ) {}

  async click(button: TButton) {
    const target = this.buttons[button]; // intrinsic coords
    const canvas = this.page.locator("canvas"); // or keep a field for it
    await canvas.scrollIntoViewIfNeeded();

    const box = await canvas.boundingBox();
    if (!box) throw new Error("Canvas not visible");

    const { w, h } = await canvas.evaluate((c: HTMLCanvasElement) => ({
      w: c.width,
      h: c.height,
    }));

    const offsetX = (target.x * box.width) / w;
    const offsetY = (target.y * box.height) / h;

    await this.page.mouse.click(box.x + offsetX, box.y + offsetY);
    await this.page.waitForTimeout(150);
  }
}
