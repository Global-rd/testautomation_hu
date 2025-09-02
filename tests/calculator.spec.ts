import { test, expect } from "@playwright/test";
import { CalculatorPage } from "../pages/CalculatorPage";
import { CalculatorService } from "../services/CalculatorService";
import * as dotenv from "dotenv";

dotenv.config();

let calculatorPage: CalculatorPage;
let service: CalculatorService;

test.beforeEach(async ({ page }) => {
	calculatorPage = new CalculatorPage(page);
	await calculatorPage.goto(process.env.CALCULATOR_URL!);
	service = new CalculatorService(calculatorPage);

	const acceptButton = page.locator("text=AGREE");
		if (await acceptButton.isVisible()) {
			await acceptButton.click();
	}

	const hideAd = page.locator('.publift-widget-sticky_footer-button');
		if (await hideAd.isVisible()) {
			await hideAd.click();
		}
	});

test("canvas calculator operation", async () => {
	const num1 = parseInt(process.env.NUMBER1!, 10);
	const num2 = parseInt(process.env.NUMBER2!, 10);
	const op = process.env.OPERATION as "+" | "-" | "*" | "/";

	const result = await service.calculate(num1, num2, op);

	let expected: number;
	switch (op) {
		case "+": expected = num1 + num2; break;
		case "-": expected = num1 - num2; break;
		case "*": expected = num1 * num2; break;
		case "/": expected = num1 / num2; break;
	}

	expect(result).toBe(expected);
});
