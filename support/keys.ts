export type Operation = 'dot'
  | 'eq'
  | 'divs'
  | 'multi'
  | 'subs'
  | 'adds'
  | 'clear'

export type CalculatorButton =
  | number   // 0–9
  | 'dot'
  | 'eq'
  | 'divs'
  | 'multi'
  | 'subs'
  | 'adds'
  | 'clear';

export class Keys {
  static getButtons(
    canvasWidth: number,
    canvasHeight: number,
    buttonToPress: CalculatorButton
  ): [number, number] {
    console.log('Pressed button:', buttonToPress);

    const canvasCenterX = canvasWidth / 2;
    const canvasCenterY = canvasHeight / 2;

    let X: number;
    let Y: number;

    switch (buttonToPress) {
      case 1:
        X = canvasCenterX - canvasCenterX / 1.5;
        Y = canvasCenterY + canvasCenterY / 3;
        break;
      case 2:
        X = canvasCenterX - canvasCenterX / 3;
        Y = canvasCenterY + canvasCenterY / 3;
        break;
      case 3:
        X = canvasCenterX;
        Y = canvasCenterY + canvasCenterY / 3;
        break;
      case 4:
        X = canvasCenterX - canvasCenterX / 1.5;
        Y = canvasCenterY;
        break;
      case 5:
        X = canvasCenterX - canvasCenterX / 3;
        Y = canvasCenterY;
        break;
      case 6:
        X = canvasCenterX;
        Y = canvasCenterY;
        break;
      case 7:
        X = canvasCenterX - canvasCenterX / 1.5;
        Y = canvasCenterY - canvasCenterY / 3;
        break;
      case 8:
        X = canvasCenterX - canvasCenterX / 3;
        Y = canvasCenterY - canvasCenterY / 3;
        break;
      case 9:
        X = canvasCenterX;
        Y = canvasCenterY - canvasCenterY / 3;
        break;
      case 0:
        X = canvasCenterX - canvasCenterX / 1.5;
        Y = canvasCenterY + canvasCenterY / 2;
        break;
      case 'dot':
        X = canvasCenterX - canvasCenterX / 3;
        Y = canvasCenterY + canvasCenterY / 2;
        break;
      case 'eq':
        X = canvasCenterX;
        Y = canvasCenterY + canvasCenterY / 1.5;
        break;
      case 'divs':
        X = canvasCenterX + canvasCenterX / 1.5;
        Y = canvasCenterY - canvasCenterY / 3;
        break;
      case 'multi':
        X = canvasCenterX + canvasCenterY / 2;
        Y = canvasCenterY;
        break;
      case 'subs':
        X = canvasCenterX + canvasCenterY / 2;
        Y = canvasCenterY + canvasCenterY / 3;
        break;
      case 'adds':
        X = canvasCenterX + canvasCenterY / 2;
        Y = canvasCenterY + canvasCenterY / 1.5;
        break;
      case 'clear':
        X = canvasCenterX - canvasCenterX / 1.5;
        Y = canvasCenterY - canvasCenterY / 1.5;
        break;
      default:
        console.warn(`Unknown button: ${buttonToPress}`);
        return [canvasCenterX, canvasCenterY];
    }

    console.log('X:', X, 'Y:', Y);
    return [X, Y];
  }
}