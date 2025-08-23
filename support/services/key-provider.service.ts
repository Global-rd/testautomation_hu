import {Location, CalculatorSize} from '../model/HelperObjects'

export class KeyProviderService {

    private tokens: string[] = ['MC', 'MR', 'M+', 'M-', 'C', 'CE', '/', '√', '*', '%', '-', '1/x', '+', '=', '+/-', '.', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    private readonly pattern: RegExp;

    constructor(private calculatorSize: CalculatorSize) {
        this.tokens.sort((a, b) => b.length - a.length);
        const escapedTokens: string = this.tokens.map(token => {
            return token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }).join('|');

        this.pattern = new RegExp(escapedTokens, 'g');
    }

    public getKeysFromInput(input: string): string[] {
        return input.match(this.pattern);
    }

    public getKeyLocation(key: string): Location{
        switch (key){
            case '6':
                return {
                    x: this.calculatorSize.width / 2,
                    y: this.calculatorSize.height / 2
                };

            default:
                return null;
        }
    }
}