import type { Page } from '@playwright/test';
import { CalculatorPage } from '../pages/calculatorPage.js';
import { CalculatorService } from '../services/calculatorService.js';

export async function openCalculator(page: Page) {
  const calc = new CalculatorPage(page);
  await calc.goto();
  const svc = new CalculatorService(calc);
  return { calc, svc };
}