import { Page } from '@playwright/test';
import { CanvasClickHelper } from './CanvasClickHelper';
import Tesseract from 'tesseract.js';

type Operation = '+' | '-' | '*' | '/';

const buttonMap = {
  '0': { x: 50, y: 400 },
  '1': { x: 50, y: 350 },
  '2': { x: 100, y: 350 },
  '3': { x: 150, y: 350 },
  '4': { x: 50, y: 300 },
  '5': { x: 100, y: 300 },
  '6': { x: 150, y: 300 },
  '7': { x: 50, y: 250 },
  '8': { x: 100, y: 250 },
  '9': { x: 150, y: 250 },
  '+': { x: 200, y: 250 },
  '-': { x: 200, y: 300 },
  '*': { x: 200, y: 350 },
  '/': { x: 200, y: 400 },
  '=': { x: 250, y: 400 },
  'C': { x: 300, y: 400 }
} as const;

export class CalculatorPage {
  private helper: CanvasClickHelper<typeof buttonMap>;

  constructor(private page: Page) {
    this.helper = new CanvasClickHelper(page, buttonMap);
  }

  async pressNumber(num: number) {
    for (const digit of num.toString()) {
      await this.helper.click(digit as keyof typeof buttonMap);
    }
  }

  async pressOperation(op: Operation) {
    await this.helper.click(op);
  }

  async pressEquals() {
    await this.helper.click('=');
  }

  async clear() {
    await this.helper.click('C');
  }

  async getResult(): Promise<number> {
    const canvas = await this.page.$('canvas');
    const screenshot = await canvas!.screenshot();
    const { data: { text } } = await Tesseract.recognize(screenshot, 'eng');
    const cleaned = text.replace(/[^0-9.-]/g, '').trim();
    return parseFloat(cleaned);
  }
}
