import type { Page } from "@playwright/test";
import Tesseract from "tesseract.js";
import { CanvasButtonInteractor } from "../utils/canvasInteractor";
import {
  getCanvasCenter,
  getCanvasDimensions,
  maybeAdjustForWebKit,
  CANVAS_RENDER_DELAY,
} from "../utils/helpers";
import type { OperatorSymbol, CalcButton, ButtonMap } from "../utils/types";

export class calcInterface {
  private interactor!: CanvasButtonInteractor<CalcButton>;
  private canvasDimensions!: { width: number; height: number };
  private canvasCenter!: { x: number; y: number };

  constructor(private page: Page, private targetUrl: string) {}
// A kalkulátor oldal betöltése és inicializálása
  async launch() {
    await this.page.goto(this.targetUrl);
    await this.page.waitForSelector("canvas");

    const center = await getCanvasCenter(this.page);
    const rawDimensions = await getCanvasDimensions(this.page);
    this.canvasDimensions = await maybeAdjustForWebKit(this.page, rawDimensions);
    this.canvasCenter = center;

    const cx = this.canvasDimensions.width / 2;
    const cy = this.canvasDimensions.height / 2;

    // Gomb koordináták meghatározása a vásznon
    const coordinates: ButtonMap<CalcButton> = {
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

    this.interactor = new CanvasButtonInteractor<CalcButton>(
      this.page,
      this.canvasCenter,
      this.canvasDimensions,
      coordinates
    );

    await this.page.waitForTimeout(CANVAS_RENDER_DELAY);
  }
// Számjegyek bevitele
  async inputDigit(value: number) {
    const keys = value.toString().split("") as CalcButton[];
    for (const key of keys) {
      await this.interactor.triggerButton(key);
      await this.page.waitForTimeout(100);
    }
  }

  async chooseOperator(operator: OperatorSymbol) {
    await this.interactor.triggerButton(operator as CalcButton);
  }

  async submitCalculation() {
    await this.interactor.triggerButton("=");
  }

  async resetCalculator() {
    await this.interactor.triggerButton("C");
  }
   // Az eredmény kinyerése és OCR feldolgozása
  async extractResult(): Promise<number> {
    const dataURL = await this.page.evaluate(() => {
      const canvas = document.querySelector("canvas") as HTMLCanvasElement | null;
      if (!canvas) throw new Error("Canvas not found");
      return canvas.toDataURL();
    });

    const {
      data: { text },
    } = await Tesseract.recognize(dataURL, "eng", {
      tessedit_char_whitelist: "0123456789.-",
      tessedit_pageseg_mode: 7,
    } as any);

    // Az OCR eredményének tisztítása és szám konvertálása
    const lines = text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const rawText = lines[0] ?? text;
    const match = rawText.match(/-?\d+(?:\.\d+)?/);
    if (!match) throw new Error(`OCR failed, received: ${JSON.stringify(lines)}`);
    return Number(match[0]);
  }
}