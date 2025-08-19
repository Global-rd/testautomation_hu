import { test, expect } from '@playwright/test';
import { CalculatorService } from '../CalculatorService';

test('canvas calculator parametric test', async ({ page }) => {
  await page.goto('https://www.online-calculator.com/full-screen-calculator/');
  
  const service = new CalculatorService(page);
  const result = await service.performCalculation();

  // Env változókból olvasott számok és művelet
  const num1 = parseInt(process.env.NUM1 || '42', 10);
  const num2 = parseInt(process.env.NUM2 || '5', 10);
  const op = process.env.OP || '+';

  let expected: number;
  switch (op) {
    case '+': expected = num1 + num2; break;
    case '-': expected = num1 - num2; break;
    case '*': expected = num1 * num2; break;
    case '/': expected = num1 / num2; break;
    default: expected = num1 + num2;
  }

  expect(result).toBeCloseTo(expected, 1);
});

