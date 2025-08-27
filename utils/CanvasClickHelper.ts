import { Page } from "@playwright/test";

export class CanvasClickHelper<T extends Record<string, { x: number; y: number }>> {
    constructor(
        private page: Page,
        private canvasSelector: string,
        private buttonMap: T
    ) {}

    async click<K extends keyof T>(key: K): Promise<void> {
        const button = this.buttonMap[key];
        if (!button) {
        throw new Error(`Button ${String(key)} not defined in map`);
        }
        const canvas = await this.page.locator(this.canvasSelector);
        const box = await canvas.boundingBox();
        if (!box) throw new Error("Canvas not found");
        await this.page.mouse.click(box.x + button.x, box.y + button.y);
    }
}
