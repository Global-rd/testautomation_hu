export const math = (a: number, op: string, b: number): number => {
  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return a / b;
    default: throw new Error(`Unsupported op: ${op}`);
  }
};