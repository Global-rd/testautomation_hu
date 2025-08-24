import { keys } from "../utils/keys";

export class CalculatorPage {
    constructor(page, browserName) {
        this.page = page;
        this.browserName = browserName;
    }

    async goto(url) {
        await this.page.goto(url);
    }

    async getCanvasSize() {
        return await this.page.evaluate(() => {
            const canvas = document.querySelector("canvas");
            return { width: canvas.width, height: canvas.height };
        });
    }

    async getCanvasCenter() {
        const boundingBox = await this.page.evaluate(() => {
            const canvas = document.querySelector("canvas");
            return canvas?.getBoundingClientRect();
        });
        return {
            x: boundingBox.x + boundingBox.width / 2,
            y: boundingBox.y + boundingBox.height / 2,
        };
    }

    async clickButton(digit, positionX, positionY, canvasSize, ) {

        let adjustedCanvas = { ...canvasSize };

        if (this.browserName === "webkit") {
            const dpr = await this.page.evaluate(() => window.devicePixelRatio);
            adjustedCanvas = {
                width: canvasSize.width / dpr,
                height: canvasSize.height / dpr,
            };
        }

        const [x, y] = keys.getButtons(adjustedCanvas.width, adjustedCanvas.height, digit);
        const clickX = positionX + (x - adjustedCanvas.width / 2);
        const clickY = positionY + (y - adjustedCanvas.height / 2);
        await this.page.mouse.click(clickX, clickY);
        await this.page.waitForTimeout(500);
    }

    async getOCRText() {
        return await keys.readOCR(this.page);
    }
}