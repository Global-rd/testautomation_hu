import {ButtonLocation} from '../model/HelperObjects';

export class CanvasClickHelper<T extends Record<string, ButtonLocation>> {

    private buttonMap: T;

    constructor(buttonMap: T) {
        this.buttonMap = buttonMap;
    }

    public getButtonLocation(key: keyof T): ButtonLocation {
        return this.buttonMap[key];
    }

}