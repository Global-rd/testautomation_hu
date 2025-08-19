import { test } from '@playwright/test';
import { CanvasCalculator } from '../fixtures/helpers/canvasCalculator';
import fs from 'fs';

test.describe('Canvas Calculator Test', () => {
  let num1: number;
  let num2: number;

  test.beforeAll(() => {
    const data = JSON.parse(fs.readFileSync('tests/fixtures/numbers.json', 'utf-8'));
    num1 = data.num1;
    num2 = data.num2;
  });

  test('should correctly sum two numbers', async ({ page }) => {
    const calculator = new CanvasCalculator(page, '#fullframe');

    await page.goto('https://www.online-calculator.com/full-screen-calculator/');

    // canvas betöltésre várakozás
    await page.waitForTimeout(2000);

    // számok bevitele
    await calculator.typeNumber(num1);
    await calculator.clickPlus();
    await calculator.typeNumber(num2);
    await calculator.clickEquals();

    // eredmény ellenőrzése OCR-rel
    await calculator.checkResult(num1 + num2);
  });
});
