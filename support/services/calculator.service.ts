import {CalculatorSize} from '../model/HelperObjects';


export class CalculatorService{

    constructor(private page: any) {
    }

    public async getCalculatorSize(): Promise<CalculatorSize> {
        const frame = this.page.frameLocator('#fullframe');
        const boundingBox = await frame.locator('canvas').boundingBox();

        if (!boundingBox) {
            throw new Error('Canvas element not found in iframe.');
        }

        return {
            width: boundingBox.width,
            height: boundingBox.height,
            x: boundingBox.x,
            y: boundingBox.y
        };
    }
}