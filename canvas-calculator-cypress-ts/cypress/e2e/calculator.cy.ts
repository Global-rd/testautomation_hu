import { CalculatorService } from "../../src/services/CalculatorService";

describe("Canvas calculator (OCR)", () => {
  it("egy konkrét művelet .env alapján", () => {
    const svc = new CalculatorService();
    const cases = svc.loadTestCases();
    const { a, b, op, expected } = cases[0];

    svc.compute(a, b, op, Cypress.env("CALC_URL") || "https://www.online-calculator.com/full-screen-calculator/")
      .then((result) => {
        const math = expected ?? eval(`${a} ${op} ${b}`);
        expect(result).to.be.closeTo(math, 0.000001);
      });
  });

  it("több fixture művelet futtatása", () => {
    const svc = new CalculatorService();
    for (const tc of svc.loadTestCases()) {
      svc.compute(tc.a, tc.b, tc.op, Cypress.env("CALC_URL") || "https://www.online-calculator.com/full-screen-calculator/")
        .then((res) => {
          const expected = tc.expected ?? eval(`${tc.a} ${tc.op} ${tc.b}`);
          expect(res).to.be.closeTo(expected, 0.000001);
        });
    }
  });
});