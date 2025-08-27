import type { Page } from "@playwright/test";
import { CalculatorPage } from "../pages/calculatorPage";
import type { OperationSymbol } from "../utils/types";
import fs from "fs";
import path from "path";

export class CalculatorService {
  constructor(private page: Page, private url: string) {}

  private loadData() {
    // 1) .env – ha van
    const a = process.env.NUMBER1 ? Number(process.env.NUMBER1) : undefined;
    const b = process.env.NUMBER2 ? Number(process.env.NUMBER2) : undefined;
    const op = process.env.OP as OperationSymbol | undefined;

    if (a !== undefined && b !== undefined && op) {
      return { a, b, op };
    }

    // 2) fixtures/data.json fallback
    const fp = path.resolve(process.cwd(), "fixtures", "data.json");
    const json = JSON.parse(fs.readFileSync(fp, "utf-8"));
    return {
      a: Number(json.NUMBER1),
      b: Number(json.NUMBER2),
      op: json.OP as OperationSymbol,
    };
  }

  async runOnce() {
    const data = this.loadData();
    const pageObj = new CalculatorPage(this.page, this.url);
    await pageObj.open();

    await pageObj.clear();
    await pageObj.pressNumber(data.a);
    await pageObj.pressOperation(data.op);
    await pageObj.pressNumber(data.b);
    await pageObj.pressEquals();

    const result = await pageObj.getResult();
    return { ...data, result };
  }
}
