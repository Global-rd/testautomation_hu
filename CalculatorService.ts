import { CalculatorPage } from './CalculatorPage';
import { Page } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

export class CalculatorService {
  private page: CalculatorPage;

  constructor(private playwrightPage: Page) {
    this.page = new CalculatorPage(playwrightPage);
  }

  async performCalculation(): Promise<number> {
    const num1 = parseInt(process.env.NUM1 || '42', 10);
    const num2 = parseInt(process.env.NUM2 || '5', 10);
    const op = (process.env.OP as '+' | '-' | '*' | '/') || '+';

    await this.page.clear();
    await this.page.pressNumber(num1);
    await this.page.pressOperation(op);
    await this.page.pressNumber(num2);
    await this.page.pressEquals();

    return await this.page.getResult();
  }
}
