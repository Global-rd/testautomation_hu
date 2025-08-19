import type { Locator, Page } from '@playwright/test';
import Tesseract from 'tesseract.js';
import { CanvasClickHelper } from '../helpers/CanvasClickHelper';
import { calculatorButtons, displayArea, type CalculatorButtonName } from '../fixtures/calculatorMap';

export type Operation = '+' | '-' | '*' | '/';

export class CalculatorPage {
  readonly url: string;
  private readonly canvas: Locator;
  private readonly clicker: CanvasClickHelper<typeof calculatorButtons>;

  constructor(private readonly page: Page, url?: string) {
    this.url = url ?? 'https://www.online-calculator.com/full-screen-calculator/';
    this.canvas = page.locator('canvas');
    this.clicker = new CanvasClickHelper(page, this.canvas, calculatorButtons);
  }

  async goto(): Promise<void> {
    await this.page.goto(this.url, { waitUntil: 'domcontentloaded' });
    await this.canvas.waitFor({ state: 'visible', timeout: 10000 });
    await this.page.waitForTimeout(500);
  }

  async clear(): Promise<void> {
    await this.clicker.click('C');
  }

  private async pressKey(name: CalculatorButtonName): Promise<void> {
    await this.clicker.click(name);
  }

  async pressNumber(num: number): Promise<void> {
    const s = String(num);
    for (const ch of s) {
      if (ch === '-') {
        await this.pressOperation('-');
      } else if (ch === '.') {
        await this.pressKey('.');
      } else {
        await this.pressKey(ch as CalculatorButtonName);
      }
      await this.page.waitForTimeout(60);
    }
  }

  async pressOperation(op: Operation): Promise<void> {
    const map: Record<Operation, CalculatorButtonName> = {
      '+': '+',
      '-': '−',
      '*': '×',
      '/': '÷'
    };
    await this.pressKey(map[op]);
  }

  async pressEquals(): Promise<void> {
    await this.pressKey('=');
  }

  async getResult(): Promise<number> {
    const box = await this.canvas.boundingBox();
    if (!box) throw new Error('Canvas bounding box not available');

    const buf = await this.canvas.screenshot();
    const rect = {
      left: Math.round(displayArea.left * box.width),
      top: Math.round(displayArea.top * box.height),
      width: Math.round(displayArea.width * box.width),
      height: Math.round(displayArea.height * box.height)
    };

    const { data } = await Tesseract.recognize(buf, 'eng', {
      tessedit_char_whitelist: '0123456789.-',
      rectangle: rect
    } as any);

    const raw = (data.text || '').trim();
    const cleaned = raw.replace(/[^\d\.\-]/g, '').replace(/−/g, '-');
    const parsed = Number.parseFloat(cleaned);
    if (Number.isNaN(parsed)) {
      throw new Error(`OCR failed. Raw="${raw}" Cleaned="${cleaned}"`);
    }
    return parsed;
  }
}