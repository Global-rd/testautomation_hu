import { Locator, Page } from '@playwright/test';
import { Button, buttonCoords } from '../utils/coords.js';
import { ocrNumber } from '../utils/ocrHelper.js';
import { CanvasClickHelper } from '../utils/canvasClickHelper.js';
import { CookieConsent } from './cookieConsent.js';

export type Op = '+' | '-' | '*' | '/';

export class CalculatorPage {
  readonly page: Page;
  private frameLocator: ReturnType<Page['frameLocator']>;
  private calculatorCanvas: Locator;
  private clicker: CanvasClickHelper<Record<Button, {x:number;y:number}>>;

  constructor(page: Page) {
    this.page = page;
    this.frameLocator = this.page.frameLocator('#fullframe');
    this.calculatorCanvas = this.frameLocator.locator('#canvas');
    this.clicker = new CanvasClickHelper(page, this.calculatorCanvas, buttonCoords);
  }

  get canvas(): Locator {
    return this.calculatorCanvas;
  }

  async goto() {
    
    await this.page.goto('', { waitUntil: 'domcontentloaded' });
    const cookie = new CookieConsent(this.page);
    await cookie.acceptIfVisible();
    await this.waitReady();
  }

  private async waitReady() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.canvas.waitFor({ state: 'visible', timeout: 15000 });

    const handle = await this.canvas.elementHandle();
    if (!handle) throw new Error('Canvas element not found');

    const box = await handle.boundingBox();
    if (!box) throw new Error('Canvas not visible');
    
    await this.page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    await this.page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await this.page.waitForTimeout(300);
  }

  async clearAll() {
    await this.clicker.click('C/CE');
    await this.page.waitForTimeout(200);
  }

  async pressDigit(d: string) {
    if (!(/[0-9.]/.test(d))) throw new Error(`Invalid digit '${d}'`);
    await this.clicker.click(d as Button, { jitter: 0.002 });
  }

  async pressNumber(num: number) {
    const s = String(num);
    for (const ch of s) {
      await this.pressDigit(ch);
      await this.page.waitForTimeout(80);
    }
  }

  async pressOperation(op: Op) {
    await this.clicker.click(op, { jitter: 0.002 });
  }

  async pressEquals() {
    await this.clicker.click('=');
    await this.page.waitForTimeout(250);
  }

  async getResult(): Promise<number> {
    const box = await this.canvas.boundingBox();
    if (!box) throw new Error('Canvas not visible');

    const padX = 0.05 * box.width;
    const top = box.y + 0.03 * box.height;
    const height = 0.16 * box.height;
    const clip = {
      x: box.x + padX,
      y: top,
      width: box.width - 2 * padX,
      height
    };

    const buf = await this.page.screenshot({ clip, animations: 'disabled', path: `test-results/ocr_clip_${Date.now()}.png` });

    const value = await ocrNumber(buf);
    return value;
  }
}