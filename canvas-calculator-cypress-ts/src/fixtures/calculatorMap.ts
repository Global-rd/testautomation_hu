import type { NormalizedCoord } from "../helpers/CanvasClickHelper";

export const calculatorButtons = {
  "C": { nx: 0.125, ny: 0.22 },
  "7": { nx: 0.125, ny: 0.36 },
  "8": { nx: 0.375, ny: 0.36 },
  "9": { nx: 0.625, ny: 0.36 },
  "÷": { nx: 0.875, ny: 0.36 },

  "4": { nx: 0.125, ny: 0.50 },
  "5": { nx: 0.375, ny: 0.50 },
  "6": { nx: 0.625, ny: 0.50 },
  "×": { nx: 0.875, ny: 0.50 },

  "1": { nx: 0.125, ny: 0.64 },
  "2": { nx: 0.375, ny: 0.64 },
  "3": { nx: 0.625, ny: 0.64 },
  "−": { nx: 0.875, ny: 0.64 },

  "0": { nx: 0.125, ny: 0.78 },
  ".": { nx: 0.375, ny: 0.78 },
  "=": { nx: 0.625, ny: 0.78 },
  "+": { nx: 0.875, ny: 0.78 }
} as const;

export const displayArea = {
  left: 0.08,
  top: 0.06,
  width: 0.84,
  height: 0.10
} as const;

export type CalculatorButtonName = keyof typeof calculatorButtons;