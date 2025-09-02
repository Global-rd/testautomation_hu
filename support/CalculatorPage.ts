import Tesseract from 'tesseract.js';
import { Keys, CalculatorButton, Operation } from '../support/keys.js';
import { Page } from '@playwright/test';

const CALCULATOR_URL = 'https://www.online-calculator.com//html5/simple/index.php?v=10';
const CANVAS_RENDER_DELAY = 500;

interface CanvasSize {
  width: number;
  height: number;
}

interface Point {
  x: number;
  y: number;
}

export class CalculatorPage {
  private page: Page;
  private canvasSelector: string;
  private canvasCenter!: Point;
  private canvasSize!: CanvasSize;

  constructor(page: Page) {
    this.page = page;
    this.canvasSelector = 'canvas';
  }

  async init(): Promise<void> {
    await this.page.goto(CALCULATOR_URL);
    this.canvasCenter = await this.getCanvasCenter();
    await this.page.waitForTimeout(CANVAS_RENDER_DELAY);

    this.canvasSize = await this.page.evaluate(() => {
      const canvas = document.querySelector('canvas') as HTMLCanvasElement | null;
      if (!canvas) {
        throw new Error('Canvas not found');
      }
      return { width: canvas.width, height: canvas.height };
    });
  }

  // Helper function to get canvas center position
  private async getCanvasCenter(): Promise<Point> {
    const boundingBox = await this.page.evaluate(() => {
      const canvas = document.querySelector('canvas');
      return canvas?.getBoundingClientRect();
    });

    if (!boundingBox) {
      throw new Error('Canvas bounding box not found');
    }

    return {
      x: boundingBox.x + boundingBox.width / 2,
      y: boundingBox.y + boundingBox.height / 2,
    };
  }

  // Helper function to click calculator button
  private async clickCalculatorButton(digit: CalculatorButton): Promise<void> {
    const buttonData = Keys.getButtons(this.canvasSize.width, this.canvasSize.height, digit);
    const clickX = this.canvasCenter.x + (buttonData[0] - this.canvasSize.width / 2);
    const clickY = this.canvasCenter.y + (buttonData[1] - this.canvasSize.height / 2);

    console.log(`Clicking digit ${digit} at position:`, [clickX, clickY]);

    await this.page.mouse.click(clickX, clickY);
    await this.page.waitForTimeout(CANVAS_RENDER_DELAY);
  }

  // Perform OCR on canvas
  private async performOCR(): Promise<string> {
    const dataURL = await this.page.evaluate(() => {
      const canvas = document.querySelector('canvas') as HTMLCanvasElement | null;
      if (!canvas) {
        throw new Error('Canvas not found for OCR');
      }
      return canvas.toDataURL();
    });

    const worker = await Tesseract.createWorker('eng');
    await worker.setParameters({
        tessedit_char_whitelist: '0123456789.',
        tessedit_pageseg_mode: Tesseract.PSM.SINGLE_LINE
    });
    const { data: { text } } = await worker.recognize(dataURL);
    await worker.terminate();

    return text;
  }

  // PUBLIC METHODS:

  async getResult(): Promise<string> {
    const text = await this.performOCR();
    console.log('OCR Result:', text);

    const lines = text.split('\n').filter(line => line.trim());
    const ocrNumber = lines[0] || text.split('\n')[0] || '';
    return ocrNumber;
  }

  async pressNumber(number: number | string): Promise<void> {
    const digits = number.toString().split('');
    for (const digit of digits) {
      await this.clickCalculatorButton(parseInt(digit, 10));
    }
  }

  async pressOperation(operation: Operation): Promise<void> {
    await this.clickCalculatorButton(operation);
  }
}
