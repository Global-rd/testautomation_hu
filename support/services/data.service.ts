import expressions from "../../fixtures/expressions.json";
import { evaluate } from 'mathjs';

export class DataService {

    loadExpressions(): string[] {
      return expressions;
    }

    evaluate(expression: string): number {
        return evaluate(expression);
    }
}