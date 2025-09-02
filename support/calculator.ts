import { FrameLocator, Locator, Page } from "@playwright/test";
import { CanvasClickHelper } from "./canvas-click.helper";

type OperationButtonType = "C" | "+" | "-" | "*" | "/" | "=";

export class CalculatorPage {
  private page?: Page;

  private frame?: FrameLocator;

  private canvas?: Locator;

  private canvasSize?: { width: number; height: number; x: number; y: number };

  private clickNumberHelper?: CanvasClickHelper<number>;

  private clickOperationHelper?: CanvasClickHelper<OperationButtonType>;

  constructor(page: Page) {
    this.page = page;
  }

  async init() {
    await this.page?.goto(
      "https://www.online-calculator.com/full-screen-calculator/",
      { timeout: 10000 }
    );

    // Hide GDPR banner with CSS
    await this.page?.addStyleTag({
      content: ".qc-cmp2-container { display: none !important; }",
    });

    // Get the iframe
    await this.page?.waitForSelector("#fullframe", { timeout: 10000 });
    this.frame = this.page?.frameLocator("#fullframe").first();

    // Wait for canvas inside iframe
    await this.frame?.locator("canvas").waitFor({ timeout: 10000 });
    await this.page?.waitForTimeout(1000);

    // Get canvas size
    this.canvas = this.frame?.locator("canvas").first();
    const box = await this.canvas?.boundingBox();

    if (!box) {
      throw new Error("Canvas not found.");
    }

    this.canvasSize = {
      width: box.width,
      height: box.height,
      x: box.x,
      y: box.y,
    };

    // Helper function to calculate button position
    const buttonPos = (col: number, row: number) => {
      if (!this.canvasSize) {
        throw new Error("Canvas size is not defined.");
      }
      const w = this.canvasSize.width;
      const h = this.canvasSize.height * 0.8;
      const mt = this.canvasSize.height * 0.2;
      const bw = w / 5;
      const bh = h / 5;

      return {
        x: bw * col + bw / 2,
        y: mt + bh * row + bh / 2,
      };
    };

    this.clickNumberHelper = new CanvasClickHelper<number>({
      7: buttonPos(0, 1),
      8: buttonPos(1, 1),
      9: buttonPos(2, 1),
      4: buttonPos(0, 2),
      5: buttonPos(1, 2),
      6: buttonPos(2, 2),
      1: buttonPos(0, 3),
      2: buttonPos(1, 3),
      3: buttonPos(2, 3),
      0: buttonPos(0, 4),
    });

    this.clickOperationHelper = new CanvasClickHelper<OperationButtonType>({
      C: buttonPos(4, 0),
      "+": buttonPos(3, 4),
      "-": buttonPos(3, 3),
      "*": buttonPos(3, 2),
      "/": buttonPos(3, 1),
      "=": buttonPos(4, 4),
    });
  }

  async click(pos: { x: number; y: number }) {
    if (!this.frame) {
      throw new Error("Frame not found.");
    }
    if (!this.canvas) {
      throw new Error("Canvas not found.");
    }
    await this.canvas.click({ position: { x: pos.x, y: pos.y } });
    await this.page?.waitForTimeout(300);
  }

  async pressNumber(num: number) {
    const pos = this.clickNumberHelper?.getButton(num);
    if (!pos) {
      throw new Error("Invalid number, it cannot be pressed.");
    }
    await this.click(pos);
  }

  async pressOperation(op: OperationButtonType) {
    const pos = this.clickOperationHelper?.getButton(op);
    if (!pos) {
      throw new Error("Invalid operation, it cannot be pressed.");
    }
    await this.click(pos);
  }

  async calculate(num1: number, num2: number, op: OperationButtonType) {
    await this.pressOperation("C");

    // Input first number
    for (const digit of num1.toString()) {
      await this.pressNumber(Number(digit));
    }

    await this.page?.waitForTimeout(500);

    await this.pressOperation(op);

    await this.page?.waitForTimeout(500);

    // Input second number
    for (const digit of num2.toString()) {
      await this.pressNumber(Number(digit));
    }

    await this.page?.waitForTimeout(500);

    await this.pressOperation("=");

    await this.page?.waitForTimeout(1000);
  }

  async getResult() {
    if (!this.canvasSize) {
      throw new Error("Canvas size is not defined.");
    }
    const width = this.canvasSize.width;
    const height = this.canvasSize.height * 0.2;
    const border = height * 0.15;
    return await this.page?.screenshot({
      // Save as image for debugging
      path: "./debug.png",
      clip: {
        x: this.canvasSize.x + border,
        y: this.canvasSize.y + border,
        width: width - border * 2,
        height: height - border * 2,
      },
    });
  }
}
