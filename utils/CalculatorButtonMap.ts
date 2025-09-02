import { CalculatorButton } from "./types";

export function buildButtonMap(width: number, height: number): Record<CalculatorButton, { x: number; y: number }> {

    const cols = 5;
    const rows = 5;

    const startYRatio = 0.2;

    const cellWidth = width / cols;
    const cellHeight = height / rows * 0.75;

    const map: Record<CalculatorButton, { x: number; y: number }> = {
        "7": { x: -2 * cellWidth, y: -cellHeight },
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
