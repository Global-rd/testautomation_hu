import {ButtonLocation} from '../support/model/HelperObjects'
import {CanvasClickHelper} from '../support/services/canvas-click-helper.service';
import {CalculatorSize} from '../support/model/HelperObjects';
import {OcrService} from '../support/services/ocr-service';


export class CalculatorPage<T extends Record<string, ButtonLocation>>{
    private canvasClickHelper: CanvasClickHelper<T>;

    private frame: any;
    private canvas: any;
    private ocrService: OcrService;

    constructor(buttons: T, private page: any, private calculatorSize: CalculatorSize) {
        this.canvasClickHelper = new CanvasClickHelper(buttons);
        this.frame = this.page.frameLocator('#fullframe');
        this.canvas = this.frame.locator('canvas');
        this.ocrService = new OcrService();
    }

    public async clickButton(key: keyof T): Promise<void> {
        const buttonLocation = this.canvasClickHelper.getButtonLocation(key);
        return this.page.mouse.click(buttonLocation.x, buttonLocation.y);
    }

    public async readResult(resultScreenHeight: number): Promise<string> {
        const dataURL = await this.canvas.evaluate((canvasElement: any) => {
             if (canvasElement instanceof HTMLCanvasElement) {
                 return canvasElement.toDataURL();
             }
             throw Error("Cannot find canvas element");
         });

        const text = await this.ocrService.readNumber(dataURL, this.calculatorSize, resultScreenHeight);

        const match = text.text.match(/-?[\d.]+/);
        return match ? match[0] : '';
    }
}