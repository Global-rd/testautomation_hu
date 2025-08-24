import {CalculatorSize} from '../model/HelperObjects';
import {Jimp} from 'jimp';
import {Tesseract} from 'tesseract.ts';

export class OcrService{

    public async readNumber(dataURL: any, calculatorSize: CalculatorSize, resultScreenHeight: number): Promise<any>{
        const base64Data = dataURL.replace(/^data:image\/png;base64,/, '');

        const imageBuffer = Buffer.from(base64Data, 'base64');

        const image = await Jimp.read(imageBuffer);

        const preprocessedImage = await image
            .crop({x: calculatorSize.width / 2, y: 0, w: (calculatorSize.width / 2) - 20, h: resultScreenHeight})
            .greyscale()
            .threshold({max: 150})
            .getBuffer("image/png");


        return await Tesseract.recognize(preprocessedImage, {
            lang: 'eng',
            tessedit_char_whitelist: '0123456789.-',
            tessedit_pageseg_mode: '8'
        });
    }
}