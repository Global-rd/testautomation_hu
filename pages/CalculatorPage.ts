import { FrameLocator, Page } from "@playwright/test";
import { CanvasClickHelper } from "../utils/CanvasClickHelper";
import { CalculatorButton } from "../utils/types";
import Tesseract from "tesseract.js";
import { buildButtonMap } from "../utils/CalculatorButtonMap";

export class CalculatorPage {
  private clickHelper!: CanvasClickHelper<Record<CalculatorButton, { x: number; y: number }>>;
  private frame: FrameLocator;

  constructor(private page: Page) {
    this.frame = this.page.frameLocator("#fullframe");
  }

  private async initClickHelper() {
    const boundingBox = await this.frame.locator("canvas").boundingBox();
    if (!boundingBox) throw new Error("Canvas not found");
    const map = buildButtonMap(boundingBox.width, boundingBox.height);
    this.clickHelper = new CanvasClickHelper(this.page, map);
  }

  async goto(url: string) {
    await this.page.goto(url);
    await this.frame.locator("canvas").waitFor();
    await this.initClickHelper();
  }

  private async getCanvasCenter() {
    const boundingBox = await this.frame.locator("canvas").boundingBox();
    if (!boundingBox) throw new Error("Canvas not found inside iframe");
    return {
      x: boundingBox.x + boundingBox.width / 2,
      y: boundingBox.y + boundingBox.height / 2,
    };
  }

  async pressNumber(num: number) {
    const digits = num.toString().split("") as CalculatorButton[];
    const center = await this.getCanvasCenter();
    for (const d of digits) {
      await this.clickHelper.clickButton(d, center);
    }
  }

  async pressOperation(op: "+" | "-" | "*" | "/") {
    const center = await this.getCanvasCenter();
    await this.clickHelper.clickButton(op, center);
  }

  async pressEquals() {
    const center = await this.getCanvasCenter();
    await this.clickHelper.clickButton("=", center);
  }

  async getResult(): Promise<number> {
    const dataURL = await this.frame.locator("canvas").evaluate((canvas: HTMLCanvasElement) => {
      return canvas.toDataURL();
    });

    const { data: { text } } = await Tesseract.recognize(dataURL, "eng");
    const match = text.match(/\d+/);
    if (!match) throw new Error(`OCR failed: ${text}`);
    return parseInt(match[0], 10);
  }
}
