import { CanvasClickHelper } from "../helpers/CanvasClickHelper";
import { calculatorButtons, displayArea, type CalculatorButtonName } from "../fixtures/calculatorMap";

export type Operation = "+" | "-" | "*" | "/";

export class CalculatorPage {
  private clicker: CanvasClickHelper<typeof calculatorButtons>;

  constructor(private readonly canvasSelector = "canvas") {
    this.clicker = new CanvasClickHelper(canvasSelector, calculatorButtons);
  }

  goto(url: string) {
    cy.visit(url);
    cy.get(this.canvasSelector).should("be.visible");
  }

  clear() {
    this.clicker.click("C");
  }

  private pressKey(name: CalculatorButtonName) {
    this.clicker.click(name);
  }

  pressNumber(num: number) {
    const s = String(num);
    for (const ch of s) {
      if (ch === "-") {
        this.pressOperation("-");
      } else if (ch === ".") {
        this.pressKey(".");
      } else {
        this.pressKey(ch as CalculatorButtonName);
      }
    }
  }

  pressOperation(op: Operation) {
    const map: Record<Operation, CalculatorButtonName> = {
      "+": "+",
      "-": "−",
      "*": "×",
      "/": "÷"
    };
    this.pressKey(map[op]);
  }

  pressEquals() {
    this.pressKey("=");
  }

  getResult(): Cypress.Chainable<number> {
    return cy.get(this.canvasSelector).screenshot("calc-display").then(() => {
      return cy.task("ocr", "cypress/screenshots/calc-display.png").then((txt: string) => {
        const cleaned = txt.replace(/[^\d\.\-]/g, "").replace(/−/g, "-");
        return parseFloat(cleaned);
      });
    });
  }
}