import { Page, Locator } from "@playwright/test";

export class CanvasClickHelper<T extends Record<string, { x: number; y: number }>> {
    private canvas: Locator;
    
    constructor(
        private page: Page,
        canvas: Locator,   // 👈 itt már Locator-t várunk
        private buttonMap: T
    ) {
        this.canvas = canvas;
    }

    async click<K extends keyof T>(key: K): Promise<void> {
        const button = this.buttonMap[key];
        if (!button) {
        throw new Error(`Button ${String(key)} not defined in map`);
        }
        await this.canvas.waitFor({ state: "visible" });
        const box = await this.canvas.boundingBox();
        if (!box) throw new Error("Canvas not found");
        await this.page.mouse.click(box.x + button.x, box.y + button.y);
    }
}
