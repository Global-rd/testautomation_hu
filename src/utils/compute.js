import { config as loadEnv } from 'dotenv';

loadEnv();

export function computeExpected() {

  const x = Number(process.env.NUMBER_A);
  const y = Number(process.env.NUMBER_B);
  const op = process.env.OP;

  let val;
  switch (op) {
    case '+': val = x + y; break;
    case '-': val = x - y; break;
    case '*': val = x * y; break;
    case '/': val = x / y; break;
    default: throw new Error(`Ismeretlen OP: ${op}`);
  }
  return String(Number.isFinite(val) ? Number(val.toFixed(10)).toString() : val);
}