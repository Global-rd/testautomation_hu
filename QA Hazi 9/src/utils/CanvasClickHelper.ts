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
    const coords = this.buttons[button];
    if (!coords) throw new Error(`Unknown button: ${String(button)}`);

    const clickX = this.origin.x + (coords.x - this.canvasSize.width / 2);
    const clickY = this.origin.y + (coords.y - this.canvasSize.height / 2);

    await this.page.mouse.click(clickX, clickY);
    await this.page.waitForTimeout(150);
  }
}
