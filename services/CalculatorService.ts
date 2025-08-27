import { CalculatorPage } from "../pages/CalculatorPage";

export class CalculatorService {
    private calcPage: CalculatorPage;

    constructor(calcPage: CalculatorPage) {
        this.calcPage = calcPage;
    }

    async calculate(a: number, op: "+" | "-" | "*" | "/", b: number): Promise<number> {
        await this.calcPage.clear();
        await this.calcPage.pressNumber(a);
        await this.calcPage.pressOperation(op);
        await this.calcPage.pressNumber(b);
        await this.calcPage.pressEquals();
        return await this.calcPage.getResult();
    }
}
