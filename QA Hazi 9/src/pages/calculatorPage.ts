import type { Page } from "@playwright/test";
import Tesseract from "tesseract.js";
import { CanvasClickHelper } from "../utils/CanvasClickHelper";
import {
  getCanvasCenter,
  getCanvasSize,
  maybeAdjustForWebKit,
  CANVAS_RENDER_DELAY,
} from "../utils/helpers";
import type { OperationSymbol, CalcButton, ButtonMap } from "../utils/types";

export class CalculatorPage {
  private helper!: CanvasClickHelper<CalcButton>;
  private canvasSize!: { width: number; height: number };

  constructor(private page: Page, private url: string) {}

  async open() {
    await this.page.goto(this.url);
    await this.page.waitForSelector("canvas");

    const center = await getCanvasCenter(this.page);
    const rawSize = await getCanvasSize(this.page);
    this.canvasSize = await maybeAdjustForWebKit(this.page, rawSize);

    // Gombok koordináta térkép (canvas koordináta rendszerben, px). Ezeket igény szerint finomhangolhatod.
    const cx = this.canvasSize.width / 2;
    const cy = this.canvasSize.height / 2;

    const map: ButtonMap<CalcButton> = {
      "7": { x: cx - cx / 1.5, y: cy - cy / 3 },
      "8": { x: cx - cx / 3, y: cy - cy / 3 },
      "9": { x: cx, y: cy - cy / 3 },
      "4": { x: cx - cx / 1.5, y: cy },
      "5": { x: cx - cx / 3, y: cy },
      "6": { x: cx, y: cy },
      "1": { x: cx - cx / 1.5, y: cy + cy / 3 },
      "2": { x: cx - cx / 3, y: cy + cy / 3 },
      "3": { x: cx, y: cy + cy / 3 },
      "0": { x: cx - cx / 1.5, y: cy + cy / 2 },
      ".": { x: cx - cx / 3, y: cy + cy / 2 },
      "=": { x: cx, y: cy + cy / 1.5 },
      "/": { x: cx + cx / 1.5, y: cy - cy / 3 },
      "*": { x: cx + cy / 2, y: cy },
      "-": { x: cx + cy / 2, y: cy + cy / 3 },
      "+": { x: cx + cy / 2, y: cy + cy / 1.5 },
      C: { x: cx - cx / 1.5, y: cy - cy / 1.5 },
    };

    this.helper = new CanvasClickHelper<CalcButton>(
      this.page,
      center,
      this.canvasSize,
      map
    );
    await this.page.waitForTimeout(CANVAS_RENDER_DELAY);
  }

  async pressNumber(num: number) {
    const digits = num.toString().split("") as CalcButton[]; // csak 0-9 és .
    for (const d of digits) {
      await this.helper.click(d);
      await this.page.waitForTimeout(100);
    }
  }

  async pressOperation(op: OperationSymbol) {
    await this.helper.click(op as CalcButton);
  }

  async pressEquals() {
    await this.helper.click("=");
  }

  async clear() {
    await this.helper.click("C");
  }

  async getResult(): Promise<number> {
    const dataURL = await this.page.evaluate(() => {
      const canvas = document.querySelector(
        "canvas"
      ) as HTMLCanvasElement | null;
      if (!canvas) throw new Error("Canvas not found");
      return canvas.toDataURL();
    });

    const {
      data: { text },
    } = await Tesseract.recognize(dataURL, "eng", {
      tessedit_char_whitelist: "0123456789.-",
      tessedit_pageseg_mode: "7" as unknown as number,
    } as any);

    // Az első számot vesszük ki a sorokból
    const lines = text
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    const raw = lines[0] ?? text;
    const numMatch = raw.match(/-?\d+(?:\.\d+)?/);
    if (!numMatch) throw new Error(`OCR failed, got: ${JSON.stringify(lines)}`);
    return Number(numMatch[0]);
  }
}
