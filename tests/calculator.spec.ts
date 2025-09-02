import { test, expect } from "@playwright/test";
import { CalcWorkflow } from "../src/services/calculatorService";

const CALC_URL =
  process.env.CALCULATOR_URL ??
  "https://www.online-calculator.com/html5/simple/index.php?v=10";

test("Canvas típusú kalkulátor ellenőrzése", async ({ page }) => {
  const workflow = new CalcWorkflow(page, CALC_URL);
  const { a, b, op, result } = await workflow.executeSingleRun();

  const computed = (() => {
    switch (op) {
      case "+": return a + b;
      case "-": return a - b;
      case "*": return a * b;
      case "/": return a / b;
      default: throw new Error(`Ismeretlen művelet: ${op}`);
    }
  })();

  // OCR pontatlanságok miatt kis eltérés megengedett
  expect(result).toBeCloseTo(computed, 6);
});
