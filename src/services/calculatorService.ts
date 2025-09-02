import type { Page } from "@playwright/test";
import { calcInterface } from "../pages/calculatorPage";
import type { OperatorSymbol } from "../utils/types";
import fs from "fs";
import path from "path";
  
// A környezeti változók vagy JSON fájl alapján történő bemenet lekérése
export class CalcWorkflow {
  constructor(private page: Page, private url: string) {}

  private retrieveInput() {
    const a = process.env.NUMBER1 ? Number(process.env.NUMBER1) : undefined;
    const b = process.env.NUMBER2 ? Number(process.env.NUMBER2) : undefined;
    const op = process.env.OP as OperatorSymbol | undefined;

    if (a !== undefined && b !== undefined && op) {
      return { a, b, op };
    }

    const fp = path.resolve(process.cwd(), "fixtures", "data.json");
    const json = JSON.parse(fs.readFileSync(fp, "utf-8"));
    return {
      a: Number(json.NUMBER1),
      b: Number(json.NUMBER2),
      op: json.OP as OperatorSymbol,
    };
  }
// A kalkulátor műveletsorozatának végrehajtása
  async executeSingleRun() {
    const data = this.retrieveInput();
    const calculator = new calcInterface(this.page,this.url);
    await calculator.launch();

    await calculator.resetCalculator();
    await calculator.inputDigit(data.a);
    await calculator.chooseOperator(data.op);
    await calculator.inputDigit(data.b);
    await calculator.submitCalculation();

    const result = await calculator.extractResult();
    return { ...data, result };
  }
}
