import "dotenv/config";
import { CalculatorPage, type Operation } from "../pages/CalculatorPage";

type TestCase = { a: number; b: number; op: Operation; expected?: number };

export class CalculatorService {
  loadTestCases(): TestCase[] {
    const a = process.env.A;
    const b = process.env.B;
    const op = process.env.OP as Operation | undefined;

    if (a && b && op) {
      return [{ a: Number(a), b: Number(b), op, expected: undefined }];
    }

    return [
      { a: 123, b: 45, op: "+", expected: 168 },
      { a: 1000, b: 333, op: "-", expected: 667 },
      { a: 12.5, b: 3, op: "*", expected: 37.5 },
      { a: 144, b: 12, op: "/", expected: 12 }
    ];
  }

  compute(a: number, b: number, op: Operation, url: string): Cypress.Chainable<number> {
    const pageObj = new CalculatorPage();
    pageObj.goto(url);
    pageObj.clear();
    pageObj.pressNumber(a);
    pageObj.pressOperation(op);
    pageObj.pressNumber(b);
    pageObj.pressEquals();
    return pageObj.getResult();
  }
}