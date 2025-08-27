export type OperationSymbol = "+" | "-" | "*" | "/";

// A vászon gombnevek típusai – testreszabható
export type CalcButton =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "."
  | "="
  | "+"
  | "-"
  | "*"
  | "/"
  | "C";

export type ButtonMap<T extends string> = Record<T, { x: number; y: number }>;
