// utils/CalculatorButtonMap.ts
import { CalculatorButton } from "./types";

export function buildButtonMap(canvasWidth: number, canvasHeight: number): Record<CalculatorButton, { x: number; y: number }> {
  // a teljes keypad a canvas közepén van → osszuk fel rácsra
  const buttonWidth = canvasWidth / 5;   // 5 oszlop
  const buttonHeight = canvasHeight / 6; // 6 sor (fejléc + 5 sor gomb)

  // segédfüggvény: adjon vissza gomb közepét (col, row)
  const pos = (col: number, row: number) => ({
    x: -canvasWidth / 2 + col * buttonWidth + buttonWidth / 2,
    y: -canvasHeight / 2 + row * buttonHeight + buttonHeight / 2,
  });

  return {
    "7": pos(0, 1),
    "8": pos(1, 1),
    "9": pos(2, 1),
    "/": pos(3, 1),

    "4": pos(0, 2),
    "5": pos(1, 2),
    "6": pos(2, 2),
    "*": pos(3, 2),

    "1": pos(0, 3),
    "2": pos(1, 3),
    "3": pos(2, 3),
    "-": pos(3, 3),

    "0": pos(0, 4),
    ".": pos(1, 4),
    "+": pos(3, 4),
    "=": pos(4, 4),

    // extra gombok (ha kell)
    "C": pos(4, 0),
  } as const;
}
