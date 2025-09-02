// Calculator OCR Test with Playwright and Tesseract.js
import { CalculatorPage } from './CalculatorPage';
import { Page } from '@playwright/test';
import { Operation } from './keys';

export class CalculatorService {
  static async run(
    page: Page,
    number1: number | string,
    number2: number | string,
    operation: Operation
  ): Promise<string> {
    // create CalculatorPage instance
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.init();

    // Click the two digits and operation
    await calculatorPage.pressNumber(number1);
    await calculatorPage.pressOperation(operation);
    await calculatorPage.pressNumber(number2);
    await calculatorPage.pressOperation('eq');

    // Perform OCR to read result
    const ocrNumber = await calculatorPage.getResult();
    return ocrNumber;
  }
}
