import { test, expect } from '@playwright/test';
import { CalculatorService } from '../src/services/CalculatorService';
import 'dotenv/config';

test.describe('Canvas calculator (OCR-ral)', () => {
  test('egy konkrét művelet .env alapján', async ({ page }) => {
    const svc = new CalculatorService(page);
    const cases = svc.loadTestCases();
    const { a, b, op, expected } = cases[0];

    const result = await svc.compute(a, b, op, process.env.CALC_URL);
    if (expected !== undefined) {
      expect(result).toBeCloseTo(expected, 6);
    } else {
      const math = eval(`${a} ${op} ${b}`) as number;
      expect(result).toBeCloseTo(math, 6);
    }
  });

  test('több fixture művelet futtatása', async ({ page }) => {
    const svc = new CalculatorService(page);
    for (const tc of svc.loadTestCases()) {
      const res = await svc.compute(tc.a, tc.b, tc.op, process.env.CALC_URL);
      const expected = tc.expected ?? (eval(`${tc.a} ${tc.op} ${tc.b}`) as number);
      expect(res).toBeCloseTo(expected, 6);
    }
  });
});