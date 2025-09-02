import { test as base, expect } from '@playwright/test';
import { CalculatorService } from '../support/CalculatorService';
import numbersData from './fixture/numbers.json';
import type { Operation } from '../support/keys';

interface NumbersFixture {
  number1: string;
  number2: string;
  operation: string;
}

const test = base.extend<{
  number1: number;
  number2: number;
  operation: Operation;
}>({
  number1: async ({}, use) => {
    await use(parseInt((numbersData as NumbersFixture).number1, 10));
  },
  number2: async ({}, use) => {
    await use(parseInt((numbersData as NumbersFixture).number2, 10));
  },
  operation: async ({}, use) => {
    const op = (numbersData as NumbersFixture).operation;
    
    // Cast the string to Operation
    if (
      op === 'dot' ||
      op === 'eq' ||
      op === 'divs' ||
      op === 'multi' ||
      op === 'subs' ||
      op === 'adds' ||
      op === 'clear'
    ) {
      await use(op as Operation);
    } else {
      throw new Error(`Invalid operation in fixture: ${op}`);
    }
  },
});

test('Calculator OCR Tests', async ({ page, number1, number2, operation }) => {
  const expectedResult = number1 + number2;

  const ocrNumber = await CalculatorService.run(page, number1, number2, operation);

  console.log('Extracted number:', ocrNumber);

  expect(Number(ocrNumber)).toBe(expectedResult);
});
