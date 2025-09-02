import { Page } from "@playwright/test";
import { CalculatorPage } from "./calculator";
require("dotenv").config();

export class CalculatorService {
  private calc: CalculatorPage;

  constructor(page: Page) {
    this.calc = new CalculatorPage(page);
  }

  async init() {
    return await this.calc.init();
  }

  getConfig() {
    return {
      num1: Number(process.env.FIRST_NUMBER),
      num2: Number(process.env.SECOND_NUMBER),
      add_result: Number(process.env.ADD_RESULT),
      subtract_result: Number(process.env.SUBTRACT_RESULT),
      multiply_result: Number(process.env.MULTIPLY_RESULT),
      divide_result: Number(process.env.DIVIDE_RESULT),
    };
  }

  async add(num1: number, num2: number) {
    await this.calc.calculate(num1, num2, "+");
  }

  async subtract(num1: number, num2: number) {
    await this.calc.calculate(num1, num2, "-");
  }

  async multiply(num1: number, num2: number) {
    await this.calc.calculate(num1, num2, "*");
  }

  async divide(num1: number, num2: number) {
    await this.calc.calculate(num1, num2, "/");
  }

  async getResult() {
    return await this.calc.getResult();
  }
}
