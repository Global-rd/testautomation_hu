import { test, expect } from '@playwright/test';
import cases from '../fixtures/calcData.json' with { type: 'json' };
import { math } from '../src/utils/math.js';
import { openCalculator } from '../src/utils/calculatorStarter.js';
import type { Op } from '../src/pages/calculatorPage.js';
import { registerCalcMatchers } from '../src/utils/expectCalculation.js';

registerCalcMatchers();

test.describe('Canvas Calculator (OCR)', () => {
  test('run calculator with .env', async ({ page }) => {
    const { svc } = await openCalculator(page);
    const { a, b, op } = svc.loadInput();
    const got = await svc.calculate(a, op, b);
    const expectVal = math(a, op, b);
    expect(got).toBeCalcResult(expectVal);
  });

  for (const c of cases.cases) {
    test(`run calculator with .json | ${c.a} ${c.op} ${c.b} (${c.desc})`, async ({ page }) => {
      const { svc } = await openCalculator(page);
      const got = await svc.calculate(c.a, c.op as Op, c.b);
      const expectVal = math(c.a, c.op, c.b);
      expect(got).toBeCalcResult(expectVal);
    });
  }
});