import { test, expect } from "@playwright/test";
import { CalculatorPage } from "../pages/CalculatorPage";
import { CalculatorService } from "../services/CalculatorService";

test("Canvas calculator addition", async ({ page }) => {
    await page.goto("https://www.online-calculator.com/full-screen-calculator/");
    const calcPage = new CalculatorPage(page);
    const service = new CalculatorService(calcPage);

    const result = await service.calculate(12, "+", 34);
    expect(result).toBe(46);
});
