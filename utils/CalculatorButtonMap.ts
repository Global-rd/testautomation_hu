// utils/CalculatorButtonMap.ts
import { CalculatorButton } from "./types";

export function buildButtonMap(width: number, height: number): Record<CalculatorButton, { x: number; y: number }> {
  // Canvas teljes mérete
  const cols = 5;
  const rows = 5;

  // A teljes mátrixban ott vannak a memóriagombok is → offset kell
  const startYRatio = 0.2; // kb. a felső részt (result + memóriagombok) átugorjuk

  const cellWidth = width / cols;
  const cellHeight = height-startYRatio / (rows + 1); // +1 sor a memóriának

  const map: Record<CalculatorButton, { x: number; y: number }> = {
    "7": { x: -2 * cellWidth, y: -cellHeight },  // sor2, oszlop1
    "8": { x: -cellWidth, y: -cellHeight },
    "9": { x: 0, y: -cellHeight },
    "/": { x: cellWidth, y: -cellHeight },
    "√": { x: 2 * cellWidth, y: -cellHeight },

    "4": { x: -2 * cellWidth, y: 0 },
    "5": { x: -cellWidth, y: 0 },
    "6": { x: 0, y: 0 },
    "*": { x: cellWidth, y: 0 },
    "%": { x: 2 * cellWidth, y: 0 },

    "1": { x: -2 * cellWidth, y: cellHeight },
    "2": { x: -cellWidth, y: cellHeight },
    "3": { x: 0, y: cellHeight },
    "-": { x: cellWidth, y: cellHeight },
    "1/x": { x: 2 * cellWidth, y: cellHeight },

    "0": { x: -2 * cellWidth, y: 2 * cellHeight },
    ".": { x: -cellWidth, y: 2 * cellHeight },
    "+/-": { x: 0, y: 2 * cellHeight },
    "+": { x: cellWidth, y: 2 * cellHeight },
    "=": { x: 2 * cellWidth, y: 2 * cellHeight },
  };

  return map;
}
