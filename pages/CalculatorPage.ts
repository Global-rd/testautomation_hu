import { Page, Locator } from "@playwright/test";
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
	private canvas!: Locator;
	private clickHelper!: CanvasClickHelper<typeof buttonMap>;

	constructor(page: Page) {
		this.page = page;
	}

	async init(): Promise<void> {
		this.canvas = this.page.frameLocator("iframe").locator("canvas");
		await this.canvas.waitFor({ state: "visible", timeout: 10000 });

		this.clickHelper = new CanvasClickHelper(this.page, this.canvas, buttonMap);
	}

	async pressNumber(num: number): Promise<void> {
		for (const digit of num.toString().split("")) {
			await this.clickHelper.click(digit);
		}
	}

	async pressOperation(op: "+" | "-" | "*" | "/"): Promise<void> {
		await this.clickHelper.click(op);
	}

	async pressEquals(): Promise<void> {
		await this.clickHelper.click("=");
	}

	async clear(): Promise<void> {
		await this.clickHelper.click("C");
	}

	async getResult(): Promise<number> {
		await this.canvas.waitFor({ state: "visible" });

		const box = await this.canvas.boundingBox();
		if (!box) throw new Error("Canvas not found");

		const displayHeight = Math.floor(box.height * 0.15);
		const buffer = await this.page.screenshot({
			clip: {
				x: box.x,
				y: box.y,
				width: box.width,
				height: displayHeight
			}
		});

		const { data: { text } } = await Tesseract.recognize(
			buffer,"eng",{
				tessedit_char_whitelist: "0123456789" 
			} as any
		);

		const clean = text.replace(/\D/g, "");
		return parseInt(clean, 10);
	}

}