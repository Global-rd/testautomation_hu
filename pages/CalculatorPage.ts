import { Page } from "@playwright/test";
import { CanvasClickHelper } from "../utils/CanvasClickHelper";
import Tesseract from "tesseract.js";

type Operation = "+" | "-" | "*" | "/";
type ButtonMap = Record<string, { x: number; y: number }>;

const buttonMap: ButtonMap = {
    "0": { x: 120, y: 540 },
    "1": { x: 50, y: 480 },
    "2": { x: 120, y: 480 },
    "3": { x: 190, y: 480 },
    "4": { x: 50, y: 420 },
    "5": { x: 120, y: 420 },
    "6": { x: 190, y: 420 },
    "7": { x: 50, y: 360 },
    "8": { x: 120, y: 360 },
    "9": { x: 190, y: 360 },
    "+": { x: 260, y: 480 },
	"-": { x: 260, y: 420 },
  	"*": { x: 260, y: 360 },
  	"/": { x: 260, y: 300 },
  	"=": { x: 260, y: 540 },
    "C": { x: 50, y: 300 }
};

export class CalculatorPage {
	private page: Page;
	private canvasSelector = "canvas";
	private clickHelper: CanvasClickHelper<typeof buttonMap>;

	constructor(page: Page) {
		this.page = page;
		this.clickHelper = new CanvasClickHelper(page, this.canvasSelector, buttonMap);
	}

	async pressNumber(num: number): Promise<void> {
		for (const digit of num.toString().split("")) {
		await this.clickHelper.click(digit);
		}
	}

	async pressOperation(op: Operation): Promise<void> {
        await this.clickHelper.click(op);
    }

	async pressEquals(): Promise<void> {
		await this.clickHelper.click("=");
	}

	async clear(): Promise<void> {
		await this.clickHelper.click("C");
	}

	async getResult(): Promise<number> {
		const canvas = await this.page.locator(this.canvasSelector);
		const buffer = await canvas.screenshot();
		const { data } = await Tesseract.recognize(buffer, "eng");
		const text = data.text.replace(/\D/g, ""); // kiszűri a zajt
		return Number(text);
	}
}
