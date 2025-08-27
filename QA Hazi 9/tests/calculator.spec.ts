import { test, expect } from "@playwright/test";
import { CalculatorService } from "../src/services/CalculatorService";

const URL =
  process.env.CALCULATOR_URL ||
  "https://www.online-calculator.com/html5/simple/index.php?v=10";

test("canvas calculator computes correctly via OOP + TS", async ({ page }) => {
  const svc = new CalculatorService(page, URL);
  const { a, b, op, result } = await svc.runOnce();

  const expected = (() => {
    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        return a / b;
    }
  })();

  // Tolerancia az OCR hibákra (pl. 1-2 pixel zaj)
  expect(result).toBeCloseTo(expected, 6);
});
