import {ButtonLocation} from '../support/model/HelperObjects'
import {CanvasClickHelper} from '../support/services/canvas-click-helper.service';
import {Tesseract} from 'tesseract.ts';
import {CalculatorSize} from '../support/model/HelperObjects';
import {Jimp} from 'jimp';


export class CalculatorPage<T extends Record<string, ButtonLocation>>{
    private canvasClickHelper: CanvasClickHelper<T>;

    constructor(buttons: T, private page: any, private calculatorSize: CalculatorSize) {
        this.canvasClickHelper = new CanvasClickHelper(buttons);
    }

    public clickButton(key: keyof T): void {
        const buttonLocation = this.canvasClickHelper.getButtonLocation(key);
        this.page.mouse.click(buttonLocation.x, buttonLocation.y);
    }

    public async readResult(resultScreenHeight: number): Promise<string> {
        const frame = this.page.frameLocator('#fullframe');

         const dataURL = await frame.locator('canvas').evaluate(canvasElement => {
             if (canvasElement instanceof HTMLCanvasElement) {
                 return canvasElement.toDataURL();
             }
             return '';
         });

        const base64Data = dataURL.replace(/^data:image\/png;base64,/, '');

        const imageBuffer = Buffer.from(base64Data, 'base64');

        const image = await Jimp.read(imageBuffer);

        const preprocessedImage = await image
            .crop({x: 0, y: 0, w: this.calculatorSize.width, h: resultScreenHeight})
            .greyscale()
            .contrast(1) // Increase contrast to a high value
            .invert()
            .getBuffer("image/png");

        const text = await Tesseract.recognize(preprocessedImage, {
            lang: 'eng',
            tessedit_char_whitelist: '0123456789.',
            tessedit_pageseg_mode: '7'
        });

        const match = text.text.match(/[\d.]+/);
        return match ? match[0] : '';
    }
}