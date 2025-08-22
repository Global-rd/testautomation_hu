export class Keys {

    getButtons(canvasWidth, canvasHeight, buttonToPress) {
        const canvasCenterX = canvasWidth / 2;
        const canvasCenterY = canvasHeight / 2;

        let X, Y;

        switch (buttonToPress) {
            case '1':
                X = canvasCenterX - (canvasCenterX / 1.5);
                Y = canvasCenterY + (canvasCenterY / 3);
                break;
            case '2':
                X = canvasCenterX - (canvasCenterX / 3);
                Y = canvasCenterY + (canvasCenterY / 3);
                break;
            case '3':
                X = canvasCenterX;
                Y = canvasCenterY + (canvasCenterY / 3);
                break;
            case '4':
                X = canvasCenterX - (canvasCenterX / 1.5);
                Y = canvasCenterY;
                break;
            case '5':
                X = canvasCenterX - (canvasCenterX / 3);
                Y = canvasCenterY;
                break;
            case '6':
                X = canvasCenterX;
                Y = canvasCenterY;
                break;
            case '7':
                X = canvasCenterX - (canvasCenterX / 1.5);
                Y = canvasCenterY - (canvasCenterY / 3);
                break;
            case '8':
                X = canvasCenterX - (canvasCenterX / 3);
                Y = canvasCenterY - (canvasCenterY / 3);
                break;
            case '9':
                X = canvasCenterX;
                Y = canvasCenterY - (canvasCenterY / 3);
                break;
            case '0':
                X = canvasCenterX - (canvasCenterX / 1.5);
                Y = canvasCenterY + (canvasCenterY / 2);
                break;
            case '.':
                X = canvasCenterX - (canvasCenterX / 3);
                Y = canvasCenterY + (canvasCenterY / 2);
                break;
            case '=':
                X = canvasCenterX;
                Y = canvasCenterY + (canvasCenterY / 1.5);
                break;
            case '/':
                X = canvasCenterX + (canvasCenterX / 1.5);
                Y = canvasCenterY - (canvasCenterY / 3);
                break;
            case '*':
                X = canvasCenterX + (canvasCenterY / 2);
                Y = canvasCenterY;
                break;
            case '-':
                X = canvasCenterX + (canvasCenterY / 2);
                Y = canvasCenterY + (canvasCenterY / 3);
                break;
            case '+':
                X = canvasCenterX + (canvasCenterY / 2);
                Y = canvasCenterY + (canvasCenterY / 1.5);
                break;
            case 'C':
                X = canvasCenterX - (canvasCenterX / 1.5);
                Y = canvasCenterY - (canvasCenterY / 1.5);
                break;
            default:
                console.warn(`Unknown button: ${buttonToPress}`);
                return [canvasCenterX, canvasCenterY];
        }

        return [X, Y];
    }
}

export const keys = new Keys();