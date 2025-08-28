import { test, expect } from "@playwright/test";
import { CalculatorPage } from "../pages/CalculatorPage";
import { CalculatorService } from "../services/CalculatorService";

test("Canvas calculator addition", async ({ page }) => {
    // oldal betöltése + cookie elfogadás
    await page.goto("https://www.online-calculator.com/full-screen-calculator/");
    const acceptBtn = page.locator("text=Accept All");
    if (await acceptBtn.isVisible()) await acceptBtn.click();

    // Page Object inicializálása
    const calcPage = new CalculatorPage(page);
    await calcPage.init();

    // Service réteg
    const service = new CalculatorService(calcPage);

    // Tisztítás, számok és művelet
    await calcPage.clear();
    const result = await service.calculate(12, "+", 34);

    // Assertion
    expect(result).toBe(46);
});
