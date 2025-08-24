import {ButtonLocation, CalculatorSize} from '../model/HelperObjects'

export class ButtonProviderService {

    private keys: string[][] = [
        ['MC', 'MR', 'M+', 'M-', 'C'],
        ['7', '8', '9', '/', '√'],
        ['4', '5', '6', '*', '%'],
        ['1', '2', '3', '-', '1/x'],
        ['0', '.',  '+/-', '+', '='],
    ]

    private readonly pattern: RegExp;
    private readonly keyWidthPercentage: number = 0.16;
    private readonly gapWidthPercentage: number = 0.03;

    private readonly keyWidth: number;
    private readonly keyHeight: number;
    private readonly gapWidth: number;
    private readonly resultScreenHeight: number;


    constructor(private calculatorSize: CalculatorSize) {
        console.log(calculatorSize);
        this.pattern = new RegExp(this.getEscapedTokens(), 'g');

        this.keyWidth = calculatorSize.width * this.keyWidthPercentage;
        this.keyHeight = this.keyWidth;
        this.gapWidth = this.calculatorSize.width * this.gapWidthPercentage;
        this.resultScreenHeight = this.keyHeight + (this.gapWidth * 2);
    }

    get resultScreenSize(): number {
        return this.resultScreenHeight;
    }

    public parseInput(input: string): string[] {
        return input.match(this.pattern);
    }

    public getCalculatorKeys(): Record<string, ButtonLocation> {
        const keys: Record<string, ButtonLocation> = {};

        this.keys.forEach((keysRow, rowIndex) => {
            keysRow.forEach((key, columnIndex) => {
                keys[key] = {
                    y: this.getRowLocation(rowIndex),
                    x: this.getColumnLocation(columnIndex)
                }
            })
        });

        return keys;
    }

    private getEscapedTokens() {
        return this.keys.flatMap(t => t).sort((a, b) => b.length - a.length).map(token => {
            return token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }).join('|');
    }

    private getColumnLocation(columnIndex: number): number {
        return this.calculatorSize.x + ((this.gapWidth + this.keyWidth) * columnIndex) + this.gapWidth + (this.keyWidth / 2);
    }

    private getRowLocation(rowIndex: number): number {
        return this.calculatorSize.y + this.resultScreenHeight + ((this.gapWidth + this.keyHeight) * rowIndex) + this.gapWidth + (this.keyHeight / 2);
    }
}