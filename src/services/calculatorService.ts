import * as fs from 'fs';
import * as path from 'path';
import 'dotenv/config';
import { CalculatorPage, Op } from '../pages/calculatorPage.js';

export interface CalcInput {
  a: number;
  b: number;
  op: Op;
}

export class CalculatorService {
  constructor(private page: CalculatorPage) {}

  loadInput(): CalcInput {
    const envA = process.env.OPERAND_A;
    const envB = process.env.OPERAND_B;
    const envOp = process.env.OPERATION as Op | undefined;

    if (envA !== undefined && envB !== undefined && envOp) {
      return { a: Number(envA), b: Number(envB), op: envOp };
    }

    const fixPath = path.resolve(__dirname, '../../fixtures/calcData.json');
    const json = JSON.parse(fs.readFileSync(fixPath, 'utf-8'));
    const first = json.cases?.[0];
    if (!first) throw new Error('No fixtures available');
    return { a: first.a, b: first.b, op: first.op };
  }

  async calculate(a: number, op: Op, b: number): Promise<number> {
    console.log(`[CALC] ${a} ${op} ${b}  -> running...`);
    await this.page.clearAll();
    await this.page.pressNumber(a);
    await this.page.pressOperation(op);
    await this.page.pressNumber(b);
    await this.page.pressEquals();
    const res = await this.page.getResult();
    console.log(`[CALC] ${a} ${op} ${b}  = ${res} (OCR)`);
    return res;
  }
}
