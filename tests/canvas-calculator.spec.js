import { test, expect } from '@playwright/test';
import { config as loadEnv } from 'dotenv';
import path from 'node:path';
import { computeExpected } from '../src/utils/compute.js';
import { cookieConsent } from '../src/page-objects/cookieConsent.js';
import { canvasCalculator } from '../src/page-objects/canvasCalculator.js';
import { ocrPNG } from '../src/utils/ocr.js';

loadEnv();

const URL = process.env.URL ?? 'https://www.online-calculator.com/full-screen-calculator/';
const A = process.env.NUMBER_A ?? '42';
const B = process.env.NUMBER_B ?? '5';
const OP = process.env.OP ?? '+';

test.describe('Canvas calculator E2E (JS)', () => {
  test('paraméterezett művelet canvas koordinátákkal + OCR', async ({ page }) => {
    const cookies = new cookieConsent(page);
    const calc = new canvasCalculator(page);

    await page.goto(URL);
    await cookies.acceptIfVisible();
    await calc.waitReady();

    await calc.typeNumber(A);
    await calc.clickOp(OP);
    await calc.typeNumber(B);
    await calc.clickOp('=');

    const outPng = path.resolve(`./test-artifacts/display-${Date.now()}.png`);
    await calc.screenshotDisplay(outPng);

    const text = await ocrPNG(outPng, { whitelist: '0123456789.-' });

    const normalized = (text.replace(/[^\d.\-]/g, ' ').trim().split(/\s+/).pop()) || '';
    const expected = computeExpected();

    const ok =
      normalized === expected ||
      normalized === expected.replace(/\.0+$/,'') ||
      normalized.endsWith(expected) ||
      expected.endsWith(normalized);

    if (!ok) {
      console.warn('OCR raw:', text);
      console.warn('Normalized:', normalized, 'Expected:', expected);
    }

    expect(ok, `Várt: ${expected}, OCR: "${normalized}" (raw: "${text}")`).toBeTruthy();
  });
});