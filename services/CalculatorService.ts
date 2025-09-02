import { CalculatorPage } from "../pages/CalculatorPage";

export class CalculatorService {
	constructor(private page: CalculatorPage) {}

	async calculate(num1: number, num2: number, op: "+" | "-" | "*" | "/"): Promise<number> {
		await this.page.pressNumber(num1);
		await this.page.pressOperation(op);
		await this.page.pressNumber(num2);
		await this.page.pressEquals();
		return this.page.getResult();
	}
}
